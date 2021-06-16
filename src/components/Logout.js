import {Redirect} from "react-router-dom"
import {useEffect} from "react"
function Logout(props){
	//console.log(props);
	useEffect(()=>{
		localStorage.removeItem("usertoken");
	props.isloggedin()
	})
	//console.log(props);
	return (<Redirect to="/"/>)
}

export default Logout