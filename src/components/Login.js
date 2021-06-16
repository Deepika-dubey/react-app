import {Component} from "react"
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {connect} from "react-redux";
import { loginmiddleware } from "../reduxstore/MiddlewareFunction";
class Login extends Component{
	emailError
	passwordError
	apiUrl
	constructor(props){
		super(props)
        console.log(props);
		this.emailError=this.passwordError="";
		this.apiUrl="https://apifromashu.herokuapp.com/api/login"
		this.state={
			email:"",
			password:"",
		}
	}
	changeEmail=(event)=>{
		this.setState({
			email:event.target.value
		})
	}
	
	changePassword=(event)=>{
		this.setState({
			password:event.target.value
		})
	}
	
	validateEmail=(event)=>{
		this.emailError=this.passwordError="";
		event.preventDefault()
		var isValid=true;
		var inputEmail=this.state.email
		var inputPassword=this.state.password
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		
		if(!inputEmail){
			isValid=false;
			this.emailError="Email is required Field"
		}else if(!pattern.test(inputEmail)){
			isValid=false;
			this.emailError="Invalid Email Syntax"
		}
		if(!inputPassword){
			isValid=false;
			this.passwordError="Password is required Field"
		}
		this.setState({
			emailError:this.emailError,
			passwordError:this.passwordError,
		})
		if(isValid){
			var middlefunction = loginmiddleware(this.state)
			 this.props.dispatch(middlefunction)

		// 	axios({url:this.apiUrl,method:"post",data:{"email":this.state.email,"password":this.state.password}}).then((response)=>{
		// 	if(response.data.email){
		// 		//console.log('token',response.data.token)
		// 		localStorage.token = response.data.token
		// 		this.props.dispatch({
		// 			type:"LOGIN",
		// 			payload:{
		// 				token:response.data.token,
		// 				username:response.data.name
		// 			}

		// 		})
		// 		//localStorage.setItem("usertoken", response.data.token);
		// 		//console.log(this.props)
		// 		//this.props.isloggedin()
		// 		this.props.history.push("/")
		// 	}
		// 	if(response.data.message){
		// 		alert(response.data.message)
		// 	}
		// },(error)=>{})
		}
	}
	
	render(){
		return(
		<form className="container mt-3" onSubmit={this.validateEmail}>
  <div className="form-group">
    <label htmlFor="exampleInputLoginEmail1">Email address</label>
    <input type="text" className="form-control" id="exampleInputLoginEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.changeEmail}/>
    {this.emailError && <small id="emailError" className="form-text form-error alert alert-danger">{this.emailError}</small>}
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputLoginPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputLoginPassword1" placeholder="Password"  value={this.state.password} onChange={this.changePassword}/>
  {this.passwordError && <small id="passwordError" className="form-text form-error alert alert-danger">{this.passwordError}</small>}
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  {this.props.isloading && <label className="alert alert-danger">loading..........</label>}

</form>
		)
	}
	
}


//export default withRouter(Login);
//Login = withRouter(Login);
//export default connect()(Login)
Login =connect(function(state,props){
	//alert("props" + JSON.stringify(props))
  if(state.AuthReducer?.isloggedin==true){
      props.history.push("/")
  }else{
	  return {
		  isloading:state.AuthReducer?.isloading
	  }
  }
})(Login) 
// i passed login to withRouter it return me Login with some addional things
// then i exported modified Login
export default withRouter(Login)