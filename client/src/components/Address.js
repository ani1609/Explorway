import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../styles/Address.css";
import {ReactComponent as Edit} from '../icons/edit.svg';

function Address()
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [addressObject, setAddressObject] = useState([]);
    const [address, setAddress] = useState({
        name: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        contact: '',
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

    const fetchAddress = async (email) =>
    {
        try
        {
            const response = await axios.get(`http://localhost:3000/api/fetchAddress?email=${email}`);
            setAddressObject(response.data.address);
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() =>
    {
        if (user?.email)
        {
            fetchAddress(user.email);
        }
    }
    , [user]);

    useEffect(() =>
    {
        if (userToken)
        {
            fetchDataFromProtectedAPI(userToken);
        }
    }
    , [userToken]);
    
    const handleInputChange = (event) => 
    {
        const { name, value } = event.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        try
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = await axios.post("http://localhost:3000/api/addAddress", address, config);
            // console.log(response.data);
            window.location.reload();
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => 
    {
        console.log(addressObject);
    }, [addressObject]);


    return (
        <div className="address_parent">
            <div className="address_container">
                {addressObject.map((address, index) => (
                    <div key={index} className="address">
                        {index === 0 && <h4>Default</h4>}
                        <Edit className="edit_icon" />
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.postalCode}</p>
                        <p>{address.country}</p>
                        <p>{address.contact}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={address.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="street">Street:</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={address.street}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="city">City:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="state">State:</label>
                <input
                    type="text"
                    id="state"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="postalCode">Postal Code:</label>
                <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="country">Country:</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div>
                <label htmlFor="contact">Contact:</label>
                <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={address.contact}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default Address;
