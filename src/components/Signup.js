import {Component} from "react"
class Login extends Component {
    
    constructor(){
        super()
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
            console.log(this.state);
      
            let input = {};
            input["email"] = "";
            this.setState({input:input});
      
            alert('Demo Form is submited');
        }
    }
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
        
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
        
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

    login=()=>{
      this.props.callme()
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
                    <label for="email">Email Address:</label>
                    <input type="text" name="email" value={this.state.input.email} onChange={this.handleChange}             class="form-control" 
                    placeholder="Enter email" id="email" />

                    <div className="text-danger">{this.state.errors.email}</div>
                </div>
                <input type="submit" value="Signup" onClick={this.login} class="btn btn-success" />
                </form>
             </div>
         )
     }
}

export default Login