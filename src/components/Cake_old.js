import {Link} from "react-router-dom";
function Cake(props){
  //console.log("props in render" , props)
  if(props.data){
    return(   
        <div class="card" style={{width:"17rem"}}>
  <Link to={'/cake/'+props.data.cakeid}><img style={{height:"15rem"}} src={props.data.image} class="card-img-top" alt="..." /></Link>
  <div class="card-body">
    <h5 class="card-title">{props.data.name}</h5>
    <p class="card-text">{props.data.price}</p>
    <a href="#" class="btn btn-primary">View</a>
    {/* <Link to="cart"><a href="#" class="btn btn-primary">Add Cart</a></Link> */}
  </div>
</div>  
    )
    }
    else{
      return null
    }
}
export default Cake;