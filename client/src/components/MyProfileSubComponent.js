import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/MyProfileSubComponent.css';
import '../index.css';
import {ReactComponent as Edit} from '../icons/edit.svg';
import {ReactComponent as Cross} from '../icons/cross.svg';
import {ReactComponent as ProfileIcon} from '../icons/profile.svg';
import {ReactComponent as Plus} from '../icons/plus.svg';
import {ReactComponent as AddPhoto} from '../icons/addPhoto.svg';
import {ReactComponent as Delete} from '../icons/delete.svg';

function MyProfileSubComponent()
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        dob: "",
        gender: "",
        profilePic: "",
        preferredLocationType: "",
        preferredLanguage: "",
    });
    const [enableEdit, setEnableEdit] = useState(false);

    const fetchDataFromProtectedAPI = async (userToken) =>
    {
        try 
        {
            const config = {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.get("http://localhost:3000/api/user", config);
            setUser(response.data.user);
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() =>
    {
        if (userToken)
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }
    , [userToken]);

    useEffect(() => {
        if (user) {
            const dobFormatted = user.dob ? new Date(user.dob).toISOString().split('T')[0] : '';
            setFormData({
                firstName: user.name.split(" ")[0],
                lastName: user.name.split(" ")[1] || "",
                email: user.email,
                contact: user.contact || "",
                dob: dobFormatted || "",
                gender: user.gender || "none",
                profilePic: user.profilePic || "",
                preferredLocationType: user.preferredLocationType || "",
                preferredLanguage: user.preferredLanguage || "",
            });
        }
    }, [user]);

    const handleInputChange = (event) =>
    {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        if (userToken)
        {
            try
            {
                const config = {
                    headers: {
                    Authorization: `Bearer ${userToken}`,
                    },
                };
                const response = await axios.post("http://localhost:3000/api/editUserInfo", formData, config);
                console.log(response.data.user);
                window.location.reload();
            }
            catch (error)
            {
                console.error("Error fetching data:", error);
            }
        }
        
    };

    const handlePicSubmit = async (e) =>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', e.target.files[0]);
        try
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.post('http://localhost:3000/api/uploadProfilePic', formData, config);
            // console.log(response.data.user);
            fetchDataFromProtectedAPI(userToken);
            window.location.reload();
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
        
    };

    const handleDeletePhoto = async ()=>
    {
        console.log("handle delete");
        try
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.post('http://localhost:3000/api/deleteProfilePic',config);
            // console.log(response.data.user);
            fetchDataFromProtectedAPI(userToken);
            window.location.reload();
        }
        catch (error)
        {
            console.error("Error deleting photo:", error);
        }
    }

    const handleAddNewPhoto = async (e)=>
    {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', e.target.files[0]);
        try
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.post('http://localhost:3000/api/addNewProfilePic', formData, config);
            console.log(response.data.user);
            fetchDataFromProtectedAPI(userToken);
            window.location.reload();
        }
        catch (error)
        {
            console.error("Error deleting photo:", error);
        }
    }

    return (
        <div className='myprofile_sub_parent'>
            {!enableEdit && <Edit className='edit_icon_profile' onClick={()=>setEnableEdit(true)}/>}
            {enableEdit && <Cross className='cross_icon_profile' onClick={()=>setEnableEdit(false)}/>}
            {user?.profilePic ?
                <div className='image_container'>
                    <img src={`http://localhost:3000/${user.profilePic}`} alt="Profile" className="profile-pic_sub" />
                    {enableEdit && <div className='image_options'>
                        <div onClick={handleDeletePhoto}><Delete className='delete_icon'/><span>Delete photo</span></div>
                        <div>
                            <AddPhoto className='addPhoto_icon' />
                            <span >Add new</span>
                            <input type='file' onChange={handleAddNewPhoto}/>
                        </div>
                    </div>}
                </div>
                :
                <label style={!enableEdit ? { cursor: "not-allowed" } : {}}>
                    <ProfileIcon className='profile_icon_sub'/>
                    <input type='file' className='file-input' 
                        onChange={handlePicSubmit}
                        disabled={!enableEdit}
                    />
                    {enableEdit && <Plus className='plus_icon_sub'/>}
                </label>
            }
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label><br></br>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : {}}
                        readOnly={!enableEdit}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label><br></br>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : {}}
                        readOnly={!enableEdit}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br></br>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly
                        style={{cursor: "not-allowed"}}
                    />
                </div>
                <div>
                    <label htmlFor="contact">Contact Number:</label><br></br>
                    <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : {}}
                        readOnly={!enableEdit}
                    />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label><br></br>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : {}}
                        readOnly={!enableEdit}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label><br></br>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                        disabled={!enableEdit}
                    >
                        <option value="Choose one">Choose one</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="preferredLanguage">Preferred Language:</label><br></br>
                    <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                        disabled={!enableEdit}
                    >
                        <option value="Choose one">Choose one</option>
                        <option value="Bengali">Bengali</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="preferredLocationType">Preferred Location Type:</label><br></br>
                    <select
                        name="preferredLocationType"
                        value={formData.preferredLocationType}
                        onChange={handleInputChange}
                        style={!enableEdit ? { cursor: "not-allowed" } : { cursor: "pointer" }}
                        disabled={!enableEdit}
                    >
                        <option value="Choose one">Choose one</option>
                        <option value="Beaches">Beaches</option>
                        <option value="Cities">Cities</option>
                        <option value="Mountains">Mountains</option>
                        <option value="Villages">Villages</option>
                    </select>
                </div>
                {enableEdit && <button type="submit">Submit</button>}
            </form>
        </div>
    );
}

export default MyProfileSubComponent;