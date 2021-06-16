import {Component} from "react"
import axios from 'axios'
class Signup extends Component {
    
    constructor(props){
        super(props)
        this.apiUrl="https://apibyashu.herokuapp.com/api/register";
        this.state = {
            input: {},
            errors: {}
        };
           
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
    }
    handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            /*console.log(this.state);
      
            let input = {};
            input["name"] = "";
            input["email"] = "";
            input["password"] = "";

            this.setState({input:input});
            //console.log(this.state.input.name);
      
            alert('Demo Form is submited');*/
            axios({url:this.apiUrl,method:"post",data:{"name":this.state.name,"email":this.state.email,"password":this.state.password}}).then((response)=>{
              console.log(response.data);
          },(error)=>{})
        }
    }
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {

          isValid = false;
  
          errors["name"] = "Please enter your name.";
  
        }
        
        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
          }
        }

        if (!input["password"]) {

          isValid = false;
  
          errors["password"] = "Please enter your password.";
  
        }
        
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

     render(){
         const mystlye = {
            margin: "auto",
            width: "60%",
            border: "3px solid #73AD21",
            padding: "10px"
         }
         return(
             <div style={mystlye}>
                 <h1>Signup Form</h1>
                <form onSubmit={this.handleSubmit}>
                <div class="form-group" style={{width:400}}>

                    <label for="name">Name:</label>
                    <input type="text" name="name" value={this.state.input.name} onChange={this.handleChange} class="form-control" placeholder="Enter name" id="name" />
                    <div className="text-danger">{this.state.errors.name}</div>
                </div>
                <div class="form-group" style={{width:400}}>
                    <label for="email">Email Address:</label>
                    <input type="text" name="email" value={this.state.input.email} onChange={this.handleChange} class="form-control" 
                    placeholder="Enter email" id="email" />

                    <div className="text-danger">{this.state.errors.email}</div>
                </div>
                <div class="form-group" style={{width:400}}>
                    <label for="password">Password:</label>
                    <input type="text" name="password" value={this.state.input.password} onChange={this.handleChange} class="form-control" 
                    placeholder="Enter password" id="password" />

                    <div className="text-danger">{this.state.errors.password}</div>
                </div>
                <input type="submit" value="Signup" class="btn btn-success" />
                </form>
             </div>
         )
     }
}

export default Signup;