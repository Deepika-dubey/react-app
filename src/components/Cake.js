function Cake(props){
  //console.log("props in render" , props)
    return(   
        <div class="card" style={{width:"17rem"}}>
  <img style={{height:"15rem"}} src={props.data.image} class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">{props.data.name}</h5>
    <p class="card-text">{props.data.price}</p>
    <a href="#" class="btn btn-primary">View</a>
  </div>
</div>  
    )
}
export default Cake;