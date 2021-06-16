import {Link, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {connect} from "react-redux";
import {emptyCartMiddleware,addCartMiddleware,removeCakeFromCartMiddleware,removeOneCakeFromCartMiddleware} from "../reduxstore/MiddlewareFunction";

let Cart = (props) => {
    const [cakes, getCakes] = useState([]);
    let totalPrice = 0

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/cakecart',
            method: 'post'
        }).then(res => {
            if (res.data !== 'Session Expired') {
                const cakeList = res.data.data
                getCakes(cakeList);
                props.dispatch({
                    type: "SHOW_CART",
                    payload: {
                        data: cakeList
                    }
                })
            } else {
                props.history.push('/login')
            }
        }, err => {
            console.log('error')
        })
    }, [])

    let addOneCakeToCart = (cakeid) => {
        props.dispatch(addCartMiddleware(cakeid))
    }

    let removeOneCakeFromCart = (cakeid) => {
        props.dispatch(removeOneCakeFromCartMiddleware(cakeid))
    }

    let removeCakeFromCart = (cakeid) => {
        props.dispatch(removeCakeFromCartMiddleware(cakeid))
    }

    const emptyCart = () => {
        props.dispatch(emptyCartMiddleware())
    }

    return (
        <div className="container" style={{marginTop: "100px"}}>
            <h1>My Cart</h1>
            <button className="btn btn-warning" onClick={emptyCart}>Empty Cart</button>
             <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th colspan="2">Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>


                                            </tr>
                                        </thead>
                                        <tbody>

                                            {cakes.map((each, index) => {
                                                totalPrice += each.price
                                                return (
                                                    <tr>
                                                        <td><a href="#"><img src={each.image} style={{width:"8rem"}} /></a></td>
                                                        <td><a href="#">{each.name}</a></td>
                                                        <td> <button className="btn btn-success" onClick={() => addOneCakeToCart(each.cakeid)}>
                            <span>
                                plus
                            </span>
                        </button>
                        {each.quantity}
                        <button className="btn btn-warning" onClick={() => removeOneCakeFromCart(each.cakeid)}>
                            <span>
                                minus
                            </span>
                        </button></td>
                                                        {/* <td>
                                                            {each.quantity}
                                                        </td> */}
                                                        <td>${each.price}</td>
                                                        <td><button className="btn btn-danger" onClick={() => removeCakeFromCart(each.cakeid)}>
                                                        <span>
                                                            Remove
                                                        </span>
                                                        </button></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colspan="3">Total</th>
                                                <th colspan="2">${totalPrice}</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
            
            <span style={{float : "right", marginTop : "31px"}}>
                <Link to={'/checkout'} className="btn btn-primary">Checkout</Link>
            </span>
        </div>
    )
}


// Cart = connect(function (state, props){
//     if (state.CartReducer.removed) {
//         state.CartReducer.removed = false
//         window.location.reload()
//     }
// })(Cart)
//export default connect() (withRouter(Cart))

Cart =connect(function(state,props){
	//alert("props" + JSON.stringify(props))
  if(state.CartReducer.removed){
    state.CartReducer.removed = false
    window.location.reload()
}
//else{
// 	  return {
// 		  isloading:state.AuthReducer?.isloading
// 	  }
//   }
})(Cart) 
// i passed login to withRouter it return me Login with some addional things
// then i exported modified Login
export default withRouter(Cart)

