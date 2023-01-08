import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8000',    
    withCredentials : true, // send coookies or save cookie use this [true] and cors package m bhi credential true kre server.js file m
    headers : {
        'Content-type' : 'application/json',
        Accept : "application/json",
    },
  });

const postApi = axios.create({
    baseURL: 'http://localhost:8000',    
    withCredentials : true, // send cookie or save cookie use this [true] and cors package m bhi credential true kre server.js file m
    headers : {
        'Content-type' : 'multipart/form-data',
    },
  });

  class Axios{
       async signup(data) {
            return api.post('/auth/signup', data);
       }
       async verifyOtp(data){
          return api.post('/auth/verifyOtp', data);
       }
       async login(data) {
            return api.post('/auth/login', data);
       }


       async postFile(data) {
            return postApi.post('/post/postFile', data);
       }

       async fetchAllPostFromDB(){
          return api.get('/post/getAllPosts');
       }

       async increaseLike(data){
          return api.post('/post/increaseLike', data);
       }
       async fetchAllMyPosts(data){
          return api.post('/post/fetchAllMyPosts', data);
       }
       async findMyFriends(data){
          return api.post('/query/findMyFriends', data);
       }
       async follow(data){
          return api.post('/query/follow', data);
       }

       
       async fecthAllFollowers(data){
          return api.post('/chat/fecthAllFollowers', data);
       }
       async fetchAllMessages(data){
          return api.post('/chat/fetchAllMessages', data);
       }
       async saveMsg(data){
          return api.post('/chat/saveMsg', data);
       }
  }

  export default new Axios();