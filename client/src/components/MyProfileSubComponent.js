import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/MyProfileSubComponent.css';
import '../index.css';

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
        profilePic: "",
    });

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
                profilePic: user.profilePic || "",
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

    return (
        <div className='myprofile_sub_parent'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}

                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="contact">Contact Number:</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default MyProfileSubComponent;