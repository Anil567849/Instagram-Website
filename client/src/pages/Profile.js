import React from 'react';
import Nav from '../components/homeComponents/Nav';
import Styles from "../components/profileComponents/css/profile.module.css";
import MyProfile from '../components/profileComponents/MyProfile.jsx';

const Profile = () => {
  return (
    <div className="container">
        <Nav/>
        <div className={Styles.ProfileContainer}>
          <MyProfile/>
        </div>
    </div>
  )
}

export default Profile