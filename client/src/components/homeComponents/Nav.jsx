import React, {useState} from 'react'
import Styles from './css/nav.module.css';
import Axios from '../../https/index.js';
import {useNavigate, NavLink} from 'react-router-dom';
import Cookies from 'js-cookie';
import Search from '../searchComponents/Search.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {setSearch} from '../../store/searchSlice.js';

const Nav = () => {

  const navigate = useNavigate();
  
  const userId = Cookies.get('userId');

  const [showSearch, setshowSearch] = useState(false)
  const dispatch = useDispatch();

  const handleCreate = async () => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = async  e => { 
      var file = e.target.files[0]; 
      // console.log(file);

      const formData = new FormData();
      formData.append('postFile', file);
      formData.append('userId', userId);
      const result = await Axios.postFile(formData);
      if(result.status === 200){
        alert('posted successfully');
        window.location.reload(true);

      }else{
        alert('post not saved! Try again');
      }
   }
   input.click();
  }


  const handleSearch = async () => {
    setshowSearch(true);
  }



  return (
      <>    
        <Search showSearch={showSearch} setshowSearch={setshowSearch}/>
        <div className={Styles.navigationContainer}>
          {/* brand name  */}
          <div className={Styles.brandName}>
            <h1>Instagram</h1>
          </div>
    
          {/* navigation  */}
          <div className={Styles.navigationDiv}>
            <ul>
              <li style={{cursor : 'pointer'}}><NavLink to="/">Home</NavLink></li>
              <li onClick={handleSearch} style={{cursor : 'pointer'}}>Search</li>
              <li>Explore</li>
              <li style={{cursor : 'pointer'}}><NavLink to="/messages">Message</NavLink></li>
              <li>Notification</li>
              <li onClick={handleCreate} style={{cursor : 'pointer'}}>Create</li>
              <li style={{cursor : 'pointer'}}><NavLink to="/profile">Profile</NavLink></li>
            </ul>
          </div>
    
          {/* more  */}
          <div className={Styles.more}>
            <h3>More</h3>
          </div>
        </div>
      </>          
  )
}

export default Nav