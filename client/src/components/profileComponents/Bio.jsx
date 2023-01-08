import React from 'react';
import Styles from './css/bio.module.css';

const Bio = (props) => {
  
  return (
    <div className={Styles.bioContainer}>
      <div className={Styles.imageContainer}>
        <div className={Styles.imgDiv}>
          <img src="/logo512.png" alt="my image" />
        </div>
      </div>

      <div className={Styles.detailsContainer}>
        <div className={Styles.nameContainer}>
          <div className={Styles.name}>
            <h1>Anil_Kumar_10e9</h1>
          </div>
          <div className={Styles.edit}>
            <p>Edit Profile</p>
          </div>
        </div>
        <div className={Styles.followersContainer}>
          <div className={Styles.Post}>
            <p><b>{props.totalPost}</b> Posts</p>
          </div>
          <div className={Styles.followers}>
            <p><b>{props.followers}</b> Followers</p>
          </div>
          <div className={Styles.following}>
            <p><b>{props.following}</b> Following</p>
          </div>
        </div>
        <div className={Styles.descriptionContainer}>
          <p>Courage is only an accumulation of small steps.</p>
        </div>
      </div>
    </div>
  )
}

export default Bio