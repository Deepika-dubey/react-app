//import './component.css';
import {Component} from "react";
import React from "react";

import axios from "axios";

const apiurl="https://apifromashu.herokuapp.com/api/register";
class Signup extends Component {

constructor(){
    super()
    this.state = {
        emailError:'',
        email:'',
        name:'',
        password:'',
        messgaedisplay:''
  
      };
    }


    EmailValidate = () => {
        var emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

        if(this.state.email === '' || this.state.email === null){
          this.setState({
          emailError: "Email cannot be empty"
        });
        }
         if (!emailPattern.test(this.state.email) ) {
            
          this.setState({
            emailError: "Enter a valid email"
          });
        }
        if(emailPattern.test(this.state.email)){
            this.setState({
                emailError: ""
              });
        }      
      };
    
      changeEmail = (evt) => {
      
       this.EmailValidate();
          this.setState({
            email: evt.target.value,
            
          });
     
     
      }
       validateForm() {
       return this.state.email !=='' && this.state.password !=='' && this.state.name !=='';
      }
      setPassword = (evt)=>{
        this.setState({
          password: evt.target.value,
          
        });
      }
      setName = (evt)=>{
        this.setState({
          name: evt.target.value,
          
        });
      }
      formsubmit(event){
        const data = {
          name: this.state.name,
          email: this.state.email,
          password : this.state.password
      };

          event.preventDefault();
          axios({method:"POST",url:apiurl,data:data}).then((response)=>{
            console.log("response..", response.data);
              this.setState({
              messgaedisplay : response.data.message})
                },(error)=>{
            this.setState({
              messgaedisplay : error.data.message})
               
            console.log("error.......",error.data)});
        
      }
      
     render(){
         return(
            <div className="container signup ">
              <div className="row ">
                <div className="col-md-6">
                  <div className="card signup">
                  <h2 className="card-title text-center">Register</h2>
                    <div className="card-body  ">
                      <p  style={{"color":"red"}} >{this.state.messgaedisplay}</p>
                    <form autocomplete="off"  onSubmit={this.formsubmit.bind(this)} >
                        <div className="form-group">
                          <input type="text" className="signup form-control" id="name" onChange={this.setName.bind(this)} value={this.state.name}  placeholder="Name"/>
                      </div>
                      <div className="form-group">
                          <input type="text" className="signup form-control" name="email"  value={this.state.email} onChange={this.changeEmail.bind(this)} placeholder="Email"/>
                          <p class="help-block help-block-error">{this.state.emailError}</p>
                                          </div>
                        <div className="form-group">
                          <input type="password" className="signup form-control" id="password" onChange={this.setPassword.bind(this)} value={this.state.password} placeholder="Password"/>
                        </div>
                      
                        <div className="d-flex flex-row align-items-center justify-content-between">
                        <button className=" signup btn btn-primary" disabled={!this.validateForm()}>Register</button>
                        </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
         )
     }
}

export default Signup;