import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import "../styles/Address.css";
import { and } from "firebase/firestore";

function Address()
{
    const userToken = JSON.parse(localStorage.getItem('token'));
    const [user, setUser] = useState({name:"",email:"",profilePic:""});
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
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
        console.log(email);
        try
        {
            const response = await axios.get(`http://localhost:3000/api/fetchAddress?email=${email}`);
            console.log(response.data.address);
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

    const handleSubmit = (event) => 
    {
        event.preventDefault();
        try
        {
            const config = {
                headers: {
                Authorization: `Bearer ${userToken}`,
                },
            };
            const response = axios.post("http://localhost:3000/api/addAddress", address, config);
            // console.log(response.data);
        }
        catch (error)
        {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <div className="address_parent">
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}


export default Address;