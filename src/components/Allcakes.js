import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Icon } from 'react-icons-kit';
import {trashO} from 'react-icons-kit/fa/trashO'
import {edit} from 'react-icons-kit/fa/edit'

function AllCakes(props){
    if (!localStorage.getItem('email')==='deepika.dubey@neosoftmail.com' || localStorage.getItem('email')==='ashu.lekhi0540@gmail.com') {
        props.history.push('/login')
    }

    var [isloading,setLoading]=useState(true)
    var [data, setData] = useState([])
    useEffect(()=>{
        axios({
            method:"get",
            url:process.env.REACT_APP_API_BASE_URL+"/allcakes",
            data:JSON
        }).then((response)=>{
            setData(response.data.data)
            setLoading(false)
        })
    },isloading)
   
  
    return(
        <>
        <div className="container card mt-5 p-5">
            <div className="table-responsive ">
            <table className=" table table-striped">
                 <thead>
                     <tr><th colSpan="2">Cake List</th></tr>
                    <tr>
                        <th>
                            Cakes
                        </th>
                        <th className="text-center">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                   {data.map((value,index)=>{
                       return (
                        <tr>
                        <td >
                            <div className="product-box " >
                                <div className="product-image ml-4">
                                    <img src={value.image} alt="cake" height="100px" width="100px"/>
                                    <div className="d-inline-block">
                                        <span className="d-block ml-5">
                                            <small style={{fontFamily:"cursive",fontSize:"18px"}}> {value.name}</small>
                                        </span>
                                        <span  className="d-block ml-5">
                                            <small style={{fontFamily:"cursive"}}>Rs {value.price} /-</small>
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                        </td>
                        <td className="text-center p-5">
                            <div className="products-actions">
                                <span><a href="#" ><Icon icon={edit}/></a></span>
                                <span><a href="#" ><Icon icon={trashO}/></a></span>
                            
                            </div>
                        </td>
                    </tr>
                       )
                   })}
                   </tbody>
                </table>

            </div>
           
        </div>
       
        </>
    )
}

export default connect() (withRouter(AllCakes))