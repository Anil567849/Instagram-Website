import React from 'react';
import MyMessage from '../components/messageComponents/MyMessage.jsx';
import Styles from '../components/messageComponents/css/message.module.css';
import '../App.css';
import Nav from '../components/homeComponents/Nav.jsx';

const Message = () => {
  return (
    <div className="container">
        {/* <h1 className={Styles.heading}>Message</h1> */}
        <Nav/>
        <div className={Styles.messageContainer}>
            <MyMessage/>
        </div>
    </div>
    
  )
}

export default Message