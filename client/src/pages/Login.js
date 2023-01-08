import React, {useState} from 'react';
import Axios from '../https/index.js';
import { useDispatch } from 'react-redux';
import {setAuthCredentials, setOtp} from '../store/authSlice';
import { useNavigate } from "react-router-dom";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let [details, setdetails] = useState({
        phoneOrEmail : "",
        password : "",
    });

    const handleInput = (e) => {
        setdetails((old) => ({...old, [e.target.name] : e.target.value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await Axios.login(details);
            console.log(data);
            navigate('/');  
        } catch (error) {
            alert(error.response.data.message);
        }
    }


  return (
    <div>
        <form method="POST" onSubmit={handleSubmit}>
            <div>Phone Or Email : <input onChange={handleInput} type="text" name="phoneOrEmail" value={details.phoneOrEmail}/></div>
            <div>Password : <input onChange={handleInput} type="password" name="password" value={details.password}/></div>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Signup