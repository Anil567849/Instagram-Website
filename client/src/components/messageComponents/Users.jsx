import React from 'react';

const User = (props) => {  
  // console.log('props', props);
  return (
      <h1 style={{cursor : 'pointer'}} onClick={() => props.handleChat(props.id)}>{props.username}</h1>
  )
}

export default User