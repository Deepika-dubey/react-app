import { useParams } from "react-router"
import axios from "axios";
import { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {connect,useDispatch,useReducer} from "react-redux";

function Cakedetails(props){
    //alert(props)
var params = useParams(props)
var [cake, setCake]=useState([]);
//var [state, dispatch]=useReducer(reducer,initialstate);
//console.log(state)

//var dispatch=useDispatch();
//alert(cake.cakeid)


let addtocart = (e)=>{
    e.preventDefault()
    let apiUrl="https://apifromashu.herokuapp.com/api/addcaketocart"
    //alert(cake)
    axios({url:apiUrl,method:"post",headers:{authtoken:localStorage.token}, data:{"cakeid":cake.cakeid,"name":cake.name,"image":cake.image,"price":cake.price,"weight":cake.weight}}).then((response)=>{
        if(response.data.data){
            //alert(response.data.data)
            props.dispatch({
                type:"ADDTOCART",
                payload:response.data
            })
        }
        props.history.push('/cart')
        //alert(response.data.message)
    },(error)=>{})
}

var apiurl=`https://apifromashu.herokuapp.com/api/cake/${params.cakeid}`
var cakeid = params.cakeid
var [data,setData]=useState([]);
var [islodding,setLodding]=useState(true)
        useEffect(()=>{
            axios({method:"GET",url:apiurl,data:JSON}).then((response)=>{
                //console.log("response",response.data.data)
                setData(response.data.data)
                setCake(response.data.data)
                setLodding(false)
            },(error)=>{
        
                console.log("error..",error)
                setLodding(false)
            });
    
},islodding)
    return(
      
        <>
          {islodding &&  <div class="container text-center loaderbody">
                        <p className="loader-text"> loading....</p>
                        <div class="loader4">
                        </div>
                    </div>}
{!islodding && <div className="container ">
    <div className=" row card m-5">
            <div className="card-block">
                <div className="row">
                    <div className="col ">
                        <img className="img-fluid carddetails mb-3"  src={data.image}  alt="image"/>
                        <p className="card-text">{data.name}</p>
                    
                    </div>
                    <div className="col">
                    <p className="card-text">{data.name}</p>
                    <p className="text " style = {{"color":"red"}}> Rs {data.price}</p>
                    <p className="card-text">{data.description}</p>
                    <a onClick={addtocart} href="#" class="btn btn-primary">Add Cart</a>
                    </div>
                </div>
            </div>
        </div>
    </div>}
        </>

    )
}
//export default Cakedetails;
export default connect(function(state){
	return {
		token:state.AuthReducer.token
	}
})(Cakedetails)