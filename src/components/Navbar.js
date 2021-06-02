import {useEffect, useState} from "react";

function Navbar(props){
  //var [isloggedin, setUser] = useState(props.isloggedin);
  /*useEffect(()=>{
    setUser(true)
  })*/
  let logout =()=>{
    //setUser(false)
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
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Welcome {props.name}</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      {!props.isloggedin && <button class="btn btn-primary">Login</button>}
      {props.isloggedin && <button onClick={logout} class="btn btn-danger">Logout</button>}
    </form>
  </div>
</nav>
    )
}
export default Navbar;