import {Component} from "react"
class Login extends Component {
    
    constructor(props){
        super(props)
        console.log("props" , this.props)
        this.state = {
            likes:this.props.like
        }
    }

     like=()=>{
         this.setState({
             likes:(this.state.likes || 10) +1
         })
     }
     render(){
         console.log("props in render" , this.props)
         return(
             <div>
             {this.props.email}
             <div>Hey this is my first post</div>    
             <label>{this.state.likes}</label>
             <button onClick={this.like} class="btn btn-primary">Like</button>
             </div>
         )
     }
}

export default Login