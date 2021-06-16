import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {
    addCart,
    removeCakeFromCartMiddleware,
    removeOneCakeMiddleware
} from "../reduxstore/MiddlewareFunction";
import { Icon } from 'react-icons-kit';
import {plusCircle} from 'react-icons-kit/fa/plusCircle';
import {minusCircle} from 'react-icons-kit/fa/minusCircle';
import {trashO} from 'react-icons-kit/fa/trashO';


let Cake = (props) => {

    const addCakeToCart = (cakeid) => {
        props.dispatch(addCart(cakeid))
    }

    const removeOneCake = (cakeid) => {
        props.dispatch(removeOneCakeMiddleware(cakeid))
    }

    const removeCakeFromCart = (cakeid) => {
        props.dispatch(removeCakeFromCartMiddleware(cakeid))
    }

    return (
        <div className="col-md-3" style={{marginTop:"50px"}}>
                <Link to={'/cake/'+props.data.cakeid}><img src={props.data.image} style={{height:"20rem",width:"20rem"}} /></Link>
                <div className="card-body">
                    <h5 className="card-title">{props.data.name}</h5>
                    <p className="card-text">Rs. {props.data.price} /-</p>
                    { props.page === 'cart' && <p className="card-text">
                        <button className="btn btn-success" onClick={() => addCakeToCart(props.data)}>
                            <span>
                            <Icon icon={plusCircle}/>
                            </span>
                        </button>
                        &nbsp;&nbsp;&nbsp;{props.data.quantity}&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-warning" onClick={() => removeOneCake(props.data.cakeid)}>
                            <span>
                            <Icon icon={minusCircle}/>
                            </span>
                        </button>
                    </p> }
                    { props.page === 'cart' &&
                        <button className="btn btn-danger" onClick={() => removeCakeFromCart(props.data.cakeid)}>
                                <span>
                                <Icon icon={trashO}/>
                                </span>
                        </button>
                    }
                    { props.page === 'cart_summary' && <p className="card-text">Quantity {props.data.quantity} </p> }
                </div>
        </div>
    )
}

Cake = connect(function (state, props){
    if (state.CartReducer.removed) {
        state.CartReducer.removed = false
        window.location.reload()
    }
})(Cake)
export default withRouter(Cake)