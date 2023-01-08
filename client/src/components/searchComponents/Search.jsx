import React, {useState, useEffect} from 'react';
import Styles from './search.module.css';
import Axios from '../../https/index.js';
import Cookie from 'js-cookie';

const Search = (props) => {

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const myId = Cookie.get('userId');


    function closeNav() {
        props.setshowSearch(false)
    }

    useEffect(() => {

        async function fetchData() {
            const {data} = await Axios.findMyFriends({query, myId});
            console.log(data);
            setResult(data.result);
        }


        if(query){
            fetchData();
        }
    }, [query])


    

    async function handleFind(e) {

        setQuery(e.target.value);
        
    }
       
    
    async function handleFollow(id) {
        console.log(id);
        const result = await Axios.follow({id, myId});
        console.log(result);
    }

  return (
    <div>
        <div id={Styles.myNav} className={Styles.overlay} style={{width : (props.showSearch) ? '100%' : '0%'}}>
            <span style={{cursor : 'pointer', color : 'white'}} className={Styles.closebtn} onClick={closeNav}>&times;</span>
            <div className={Styles.overlayContent}>
                <form action="#">
                    <input type="text" name="search" id="" value={query} onChange={handleFind}/>
                </form>
                <div>
                    {
                        result.map((item) => {
                            return <div key={item._id} style={{padding : '1rem'}}>
                                <h1 style={{color : 'white', display : 'inline', paddingRight : '1rem'}}>Name : {item.username}</h1> <span onClick={() => handleFollow(item._id)} style={{color : 'white', cursor : 'pointer'}}>Follow</span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        {/* <span style={{fontSize : '30px', cursor : 'pointer'}} onClick={openNav}>&#9776; open</span> */}
    </div>
  )

  
}

export default Search
