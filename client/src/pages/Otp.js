import React, {useState} from 'react';
import Axios from '../https/index.js';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const authData = useSelector((state) => state.authSlice);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
        
      
      try {
        const {data} = await Axios.verifyOtp({'userOtp' : otp, 'otpData' : authData.otp, 'userData' : authData});
        
        if(data.message === 'fine'){
          console.log('otp matched');
          navigate('/');
        }else{
            alert('something went wrong');
        }
        
      } catch (error) {
        const message = error.response.data.message || 'something went wrong';
        alert(message);       
      }

    }

  return (
    <div>   
        <form onSubmit={handleSubmit} method="post">
            enter otp : <input type="text" onChange={(e) => setOtp(e.target.value)} name="otp" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Otp