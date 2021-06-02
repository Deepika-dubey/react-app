import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Signup from "./components/Signup";
import Cake from './components/Cake';
import Cakelist from './components/Cakelist';
import { useState } from 'react';

function App() {
  var details = {
    projectname :"My Cake",
    username:"Deepika Dubey"
  }
  var [login,setLogin]= useState(false)
  let myEmail = ()=>{
    setLogin(true)
  }
  return (
    <div>
      <Navbar isloggedin={login} details={details} project="Deepika Cakeshop" y="30" name="Deepika"  phone="123456"></Navbar>
      <Carousel></Carousel>
      <Cakelist></Cakelist>
      <Signup callme={myEmail}></Signup>

    </div>
  );
}

export default App;