import React from 'react';
import Styles from '../css/post.module.css';

const Post = (props) => {

  return (
    <div className={Styles.postContainer}>

      <div className={Styles.postDiv}>
        {/* name part  */}
        <div className={Styles.postBy}>

          <div className={Styles.postInfo}>
            <div className={Styles.postImgDiv}>
              <img src="logo512.png" alt="logo" />
            </div>
            <div className={Styles.postByName}>
              <p>Anil_kumar_10e9</p>
              <p>Original Audio</p>
            </div>
          </div>

          <div className={Styles.postMenu}>
            <span><img src="icons/menu_dots.svg" alt="menu image" /></span>
          </div>

        </div>
        {/* body  */}
        <div className={Styles.postBody}>  
        {     
          (props.img) ? <img src={props.imageUrl} alt="file" />  :
            <video width="100%" height="100%" controls>
              <source src={props.imageUrl} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
        }
        </div>
        {/* comment like share buttons */}
        <div className={Styles.likeCommentShareContainer}>
          <div className={Styles.likeCommentShareDiv}>
            <span onClick={() => props.handleLike(props.id)}  ><img src="icons/like.svg" alt="like image" /></span>
            <span><img src="icons/comment.svg" alt="like image" /></span>
            <span><img src="icons/share.svg" alt="like image" /></span>
          </div>
          <div className={Styles.saveDiv}>
            <span><img src="icons/add.svg" alt="like image" /></span>
          </div>
        </div>
        {/* count of like part  */}
        <div className={Styles.likeCounterDiv}>
          <p>Liked by {props.like} People</p>
        </div>
        {/* comment add  */}
        <div className={Styles.addCommentContainer}>
          <div className={Styles.addCommentDiv}>
            <span>😁</span>
            <input type="text" placeholder="Add a Comment..."/>
            <button><span><img src="icons/right_arrow.svg" alt="send button image" /></span></button>
          </div>
        </div>
      </div>        

    </div>   
  )
}

export default Post