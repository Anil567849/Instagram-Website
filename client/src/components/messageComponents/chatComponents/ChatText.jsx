import React, {useEffect} from 'react';
import Styles from '../css/chatText.module.css';

const ChatText = (props) => {

  return (
    <div className={`${Styles.container} ${props.sender && Styles.sender}`}>
        {
          <div className={Styles.chatTextDiv}>
            <span>{props.msg}</span>
            <span>{props.time}</span>
          </div>
        }
        
    </div>
  )
}

export default ChatText