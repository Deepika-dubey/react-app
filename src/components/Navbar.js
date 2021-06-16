import {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

function Navbar(props){
  //alert(localStorage.getItem('email'))
  //alert(props.projectname)
  //console.log(props);
  //var [isloggedin, setUser] = useState(props.isloggedin);
  /*useEffect(()=>{
    setUser(true)
  })*/
  // let logout =()=>{
  //   //setUser(false)
  // }
  let searchstring=""
  let  getValue = (event)=>{
    event.preventDefault()
    
    if(searchstring != null){
      //alert(searchstring);
      if(searchstring !==""){
        var url = "/search?q="+searchstring
        props.history.push(url)
      }
    }
    else{
      alert("please enter");
    }
  }

  let getSearchText = (event)=>{
    searchstring = event.target.value;
  }

 let logout = () =>{
    props.dispatch({
      type:"LOGOUT"
    })
    props.history.push('/')
  }

    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Cake Shop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Welcome {localStorage.getItem('username')}</a>
      </li>
      {props.isloggedin && (localStorage.getItem('email')==='deepika.dubey@neosoftmail.com' || localStorage.getItem('email')==='ashu.lekhi0540@gmail.com') &&
      <>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"black"}}>
          Admin
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="/addcake">Add Cake</a>
          <a class="dropdown-item" href="/allcakes">Cake List</a>
        </div>
      </li></>}
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input onChange={getSearchText} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button onClick={getValue} class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
      {!props.isloggedin && <Link to="signup"><button class="btn btn-primary">Signup</button></Link>}
      {!props.isloggedin && <Link to="login"><button class="btn btn-primary">Login</button></Link>}
      {props.isloggedin && <button onClick={logout} class="btn btn-danger">Logout</button>}
    </form>
  </div>
</nav>
    )
}
//export default withRouter(Navbar);
Navbar = withRouter(Navbar);
// function mapStateToProps(){
//   return{
//     ...props,
//     username:state["username"],
//     isloggedin:state["islogged"]
//   }
// }
// export default connect(mapStateToProps)(Navbar)

export default connect((state)=>{

  return{
    username:state.AuthReducer.username,
    isloggedin:state.AuthReducer.isloggedin,
    email: state.AuthReducer.email
  }
})(Navbar)
