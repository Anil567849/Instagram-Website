import './App.css';
import Signup from './pages/Signup.js';
import {Routes, Route} from 'react-router-dom';
import Otp from './pages/Otp.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';
import Message from './pages/Message.js';

function App() {
  return (
      <Routes>
        <Route exact path="/auth/otp" element={<Otp/>}></Route>
        <Route exact path="/auth/signup" element={<Signup/>}></Route>
        <Route exact path="/auth/login" element={<Login/>}></Route>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/profile" element={<Profile/>}></Route>
        <Route exact path="/messages" element={<Message/>}></Route>
      </Routes>
  );
}

export default App;
