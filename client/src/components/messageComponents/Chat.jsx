import React, {useState, useEffect, useRef} from 'react';
import Styles from './css/chat.module.css';
import Axios from '../../https/index.js';
import ChatText from './chatComponents/ChatText.jsx';
import NewChat from './chatComponents/NewChat.jsx';
import io from "socket.io-client"; 
const socket = io("http://localhost:8000");


const Chat = (props) => {

  const [msg, setMsg] = useState("");
  const [newMsg, setnewMsg] = useState([]);

  const messages = props.data;
  // console.log('chat', messages);

  async function handleSend() {
    try {
      const {data} = await Axios.saveMsg({myId : props.myId, receiverId : props.receiverId, msg});
      // console.log(data);
      if(data.result){
        console.log('message saved');
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        // console.log(typeof currentDate);
        setnewMsg((old) => {
          return [...old, {msg, date : currentDate, sender : true}];
        })
      }else{
        console.log('message not saved');
      }
    } catch (error) {
      console.log(error);
    }

    setMsg('');
  }

  const bottomRef = useRef();

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef?.current.scrollIntoView({behavior: 'smooth'});
  }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef?.current.scrollIntoView({behavior: 'smooth'});
  }, [msg]);

  // console.log(newMsg);
  socket.on('message', (data) => {
    if(props.myId === data.receiverId){
      console.log('socket called', data);
      setnewMsg((old) => {
        return [...old, {msg : data.msg, date : data.time, sender : false}];
      })
    }
  });


  return (
    <div className={Styles.chatContainer}>
      <div className={Styles.messagesDiv} >
        {
          (messages) ? messages.map((item) => {
            return <ChatText key={item._id} msg={item.msg} time={item.time} sender={item.sender} newMsg={null}/>
          }) : <h1>No Messages Found</h1>

        }
        {
          (newMsg.length > 0) && newMsg.map((item, idx) => {
            return <NewChat key={item.date} sender={item.sender} msg={item.msg} time={item.date}/>
          })
        }
          
      <div ref={bottomRef}/> {/*  only for scroll to bottom */}

      </div>
        <div className={Styles.inputDiv}>
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Chat