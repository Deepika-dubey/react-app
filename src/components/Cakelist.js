import cakes from "./data"
import Cake from "./Cake"
import axios from 'axios'
import { useEffect, useState } from "react"

function Cakelist(){
    const[cakes, getCakes]=useState([])
    var url = "https://apibyashu.herokuapp.com/api/allcakes";

    useEffect(()=>{
        axios({
            url:url,
            method:"get",
        }).then((response)=>{
        console.log("cake list",response,response.data)
        getCakes(response.data.data)
        },(error)=>{
            console.log("errors from api",error)
        })
    },[])
    
    return( 
       <div className="row">
           {cakes.map((each,index)=>{
               return (<Cake data={each} key={index} />)
           })}
       </div>
    )
}
export default Cakelist;