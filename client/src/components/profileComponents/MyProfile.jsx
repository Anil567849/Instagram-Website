import React, {useEffect, useState} from 'react'
import Bio from './Bio.jsx';
import Post from './Post.jsx';
import Axios from '../../https/index.js';
import Cookies from 'js-cookie';

const MyProfile = () => {
    

  const [myPosts, setMyPosts] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  
  const userId = Cookies.get('userId');

  const fetchAllMyPosts = async () => {
    try {
      const {data} = await Axios.fetchAllMyPosts({userId});
      // console.log(data);
      if(data.result.posts){
        for(let post of data.result.posts){
          setMyPosts((old) => [...old, {post}])
        }
        setTotalPost(data.result.length);
      }
      if(data.result.data){
          setFollowers(data.result.data.followers.length);
          setFollowing(data.result.data.following.length);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllMyPosts();
  }, [])
  

  return (
    <> 
        <Bio totalPost={totalPost} followers={followers} following={following}/>
        <Post myPosts={myPosts}/>
    </>
  )
}

export default MyProfile