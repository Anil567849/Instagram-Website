import React from 'react'
import Styles from './css/post.module.css';


const Post = (props) => {

  return (
    <div className={Styles.postContainer}>
      <h1>My Posts</h1>
      <div className={Styles.postDiv}>
        <div className={Styles.row}>        
        {
          props.myPosts.map(({post}) => {    
            {/* console.log(post);           */}
              const extension = post.keyName.substr(post.keyName.length-3);
              {/* console.log(extension); */}
              let img = true;
              if(extension === 'mp4'){
                img = false;
              }

              return (img) ? <div className={Styles.card}>
                      <img src={post.imageUrl} alt="post file" />
                   </div> : 
                   <div className={Styles.card}>
                    <video width="100%" height="100%" controls>
                        <source src={props.imageUrl} type="video/mp4"/>
                        Your browser does not support the video tag.
                      </video>
                    </div>
          
            
          })
        }
        </div>  
      </div>
    </div>
  )
}

export default Post