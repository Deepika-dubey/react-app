import Navbar from './components/Navbar';
import {useEffect,useState} from "react";
//import { Route, Router, Switch } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login'
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Search from './components/Search';
import Cakedetails from './components/Cakedetails';
import Cart from './components/Cart';
import axios from 'axios';
import Checkout from './components/Checkout';
import Orders from "./components/Orders";
import AddCake from './components/AddCake';
import Allcakes from './components/Allcakes';


//import Pagenotfound from './components/Pagenotfound';

function App() {
  var details = {
    projectname :"My Cake",
    username:"Deepika Dubey"
  }

  axios.interceptors.request.use((request) => {
    request.headers["authtoken"] = localStorage.getItem('token')
    return request
})
  // var [login,setLogin]= useState(false)
  // let myEmail = ()=>{
  //   setLogin(true)
  // }
  // var [user,setUser]=useState([]);
  // var [token,setToken]=useState(localStorage.getItem("usertoken"));
	// function callme(){
	// 	setToken(localStorage.getItem("usertoken"));
	// }
  // useEffect(()=>{
		
	// 	var api_url="https://apibyashu.herokuapp.com/api/getuserdetails";
	// 	if(token){
	// 		axios({url:api_url,method:"get",headers:{authtoken:token}}).then((response)=>{
	// 		if(response.data.data){
	// 			setUser(response.data.data)
	// 		}
	// 	},(error)=>{})
	// 	}else{
	// 		setUser([])
	// 	}
	// },[token])
  return (
    <div>
      <Router>
      {/* <Navbar isloggedin={login} details={details} project="Deepika Cakeshop" y="30" name="Deepika"  phone="123456"></Navbar> */}
      <Navbar projectname="Cake Shop"></Navbar>
      <Switch>
      <Route exact path="/"><Home /></Route>
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login"><Login /></Route>
      <Route exact path ="/search" component ={Search}></Route>
      <Route exact path = "/cake/:cakeid" component = {Cakedetails}></Route>
      <Route exact path = "/cart" component = {Cart}></Route>
      <Route path="/checkout"><Checkout/></Route>
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/addCake" component={AddCake} />
      <Route exact path="/allcakes" component={Allcakes} />

      </Switch>
      </Router>
    </div>
  );
}

export default App;