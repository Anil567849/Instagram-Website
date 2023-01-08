import React, {useEffect, useState} from 'react';
import User from './Users.jsx';
import Chat from './Chat.jsx';
import Axios from '../../https/index.js';
import Cookie from 'js-cookie';
import Styles from './css/myMessage.module.css';

const MyMessage = () => {

    const myId = Cookie.get('userId');
    const [following, setFollowing] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [receiverId, setReceiverId] = useState(null);
    const [allMsg, setallMsg] = useState('');
  
    async function fecthAllFollowers() {
  
      try {
        const {data} = await Axios.fecthAllFollowers({myId});
        // console.log(data);
        if(data.result){
  
          for(let user of data.result){
            setFollowing(old => [...old, user]);
          }
  
        }
      } catch (error) {
        console.log(error);
      }
  
    }
  
    useEffect(() => {
      fecthAllFollowers();
    }, [])


    async function fetchAllMessages(receiver_id) {
      try {
        const {data} = await Axios.fetchAllMessages({myId, receiver_id});
        // console.log('data', data);
        if(data.result.chat){
          setallMsg(data.result.chat);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function handleChat(receiver_id) {
        // console.log(receiver_id);
        setShowChat(true);
        fetchAllMessages(receiver_id);
        setReceiverId(receiver_id);

    }

    


    
  return (
    <>
        <div className={Styles.user}>
            {
                following.map((user) => {
                    return (<User key={user._id} handleChat={handleChat} username={user.username} id={user._id}/>);
                })
            }
        </div>
        {
          (showChat) ? <Chat data={allMsg} myId={myId} receiverId={receiverId}/> : <div className={Styles.chat}>
                                                                                      <h1>Click on the Name to start Chat</h1>
                                                                                    </div>
        }
    </>
  )
}

export default MyMessage


