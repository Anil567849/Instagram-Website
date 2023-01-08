import React from 'react';
import Styles from '../css/story.module.css';

const Story = () => {
  return (
    <div className={Styles.storyContainer}>
    
      <div className={Styles.storyDiv}>
        <div className={Styles.userImageDiv}>
          <img src="logo512.png" alt="logo" />
        </div>
        <p className={Styles.userName}>Anil Kumar Behera</p>
      </div>

    </div>
  )
}

export default Story