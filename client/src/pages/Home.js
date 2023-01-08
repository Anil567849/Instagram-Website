import React, {useEffect, useState} from "react";
import Styles from "../components/homeComponents/css/home.module.css";
import '../App.css';
import Nav from '../components/homeComponents/Nav';
import Profile from '../components/homeComponents/Profile';
import Story from '../components/homeComponents/newsFeedComponents/Story';
import Post from '../components/homeComponents/newsFeedComponents/Post';
import Axios from '../https/index.js';
import Cookies from 'js-cookie';


const Home = () => {

  const [allPost, setAllPost] = useState([]);

  const fetchAllPosts = async () => {

    try {
        const data = await Axios.fetchAllPostFromDB();
        // console.log(data);
        if(data.status === 200){
          const posts = data.data.result;
          for(let post of posts){
            setAllPost(old => [...old, {post}]);
          } 
        }else{
          alert('something went wrong');
        }
    } catch (error) {
        console.log(error);
    }

  }

  useEffect(() => {
    fetchAllPosts();
  }, [])

  const userId = Cookies.get('userId');

  const handleLike = async (imageId) => {
    // console.log('clicked', imageId);
    try {
      const data = await Axios.increaseLike({imageId, userId});
      if(data.status === 200){

        if(data.data == 'inc'){
          // console.log('liked');
          setAllPost((oldVal) => {
            const newVal = oldVal.map((item) => {
              if (item.post._id === imageId) {
                const val = item.post.likes+1;
                return {...item, post: {...item.post, likes: val}};
              }
              return item;
            });
            return newVal;
          });
        }else{
          // console.log('disliked');
          setAllPost((oldVal) => {
            const newVal = oldVal.map((item) => {
              if (item.post._id === imageId) {
                const val = item.post.likes-1;
                return {...item, post: {...item.post, likes: val}};
              }
              return item;
            });
            return newVal;
          });
        }


        

      }
      
    } catch (error) {
      console.log(error);
    }

  }

  

  return (

   
    <div className="container">

      <Nav/>

      <div className={Styles.newsFeedContainer}>

        <Story/>      
        
          {
            allPost.map(({post}) => {
              const extension = post.keyName.substr(post.keyName.length-3);
              
              let img = true;
              if(extension === 'mp4'){
                img = false;
              }
              return <Post img={img} key={post._id} id={post._id} keyName={post.keyName} imageUrl={post.imageUrl} like={post.likes} comment={post.comments} caption={post.caption} handleLike={handleLike}/>
            })
          }

      </div>
      
      <Profile/>

     </div> 
     
  );
};

export default Home;
