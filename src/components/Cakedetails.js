import {useParams, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cake from "./Cake";
import {connect} from "react-redux";
import {addCart} from "../reduxstore/MiddlewareFunction";

let CakeDetails = (props) => {
    const query = useParams();
    const [cakes, getCakes] = useState([]);
    const [relatedCakes, getRelatedCakes] = useState([]);
    let cakeList = undefined

    useEffect(() => {
        axios({
            url: process.env.REACT_APP_API_BASE_URL +'/cake/'+query.cakeid,
            method: 'get'
        }).then(res => {
            cakeList = res.data.data
            getCakes(cakeList);
        }, err => {}).then(res => {
            axios({
                url: process.env.REACT_APP_API_BASE_URL +'/searchcakes?q='+cakeList.flavour,
                method: 'get'
            }).then(res => {
                const relatedCakeList = res.data.data
                getRelatedCakes(relatedCakeList);
            }, err => {
            })
        }, err => {})
    }, [query.cakeId])

    let addToCart = (data) => {
        props.dispatch(addCart(data))
    }

    return (
        <div className="container">
            <div className=" row card m-5">
            <div className="card-block">
                <div className="row">
                    <div className="col ">
                        <img className="img-fluid carddetails mb-3" style={{height:"20rem"}}  src={cakes.image}  alt="image"/>
                        <p className="card-text">{cakes.name}</p>
                    
                    </div>
                    <div className="col">
                    <p className="card-text">{cakes.name}</p>
                    <p className="text " style = {{"color":"red"}}> Rs {cakes.price}</p>
                    <div style={{textAlign : 'left'}}>
                        <strong>Flavour :</strong> {cakes.flavour}
                    </div>
                    { cakes.ingredients && cakes.ingredients.length > 0 && <div style={{textAlign : 'left'}}>
                        <strong>Ingredients :</strong> {cakes.ingredients
                        .map(t => <span>{t}</span>)
                        .reduce((prev, curr) => [prev, ', ', curr])}
                    </div>}
                    <div style={{textAlign : 'left'}}>
                        <strong>Egg Less :</strong> {cakes.eggless ? 'Yes' : 'No'}
                    </div>
                    <p className="card-text">{cakes.description}</p>
                    <button onClick={ () => addToCart(cakes)} className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
            {/* <div className="row">
                {
                    <Cake data={cakes} page="details"/>
                }
                <div className="card col-md-8" style={{width: '18rem'}}>
                    <h1>{cakes.name}</h1>
                    <h6>{cakes.description}</h6>
                    <div style={{textAlign : 'left'}}>
                        <strong>Price :</strong> Rs. {cakes.price} /-
                    </div>
                    <div style={{textAlign : 'left'}}>
                        <strong>Flavour :</strong> {cakes.flavour}
                    </div>
                    { cakes.ingredients && cakes.ingredients.length > 0 && <div style={{textAlign : 'left'}}>
                        <strong>Ingredients :</strong> {cakes.ingredients
                        .map(t => <span>{t}</span>)
                        .reduce((prev, curr) => [prev, ', ', curr])}
                    </div>}
                    <div style={{textAlign : 'left'}}>
                        <strong>Egg Less :</strong> {cakes.eggless ? 'Yes' : 'No'}
                    </div>
                    <div style={{textAlign : 'left'}}>
                        <button onClick={ () => addToCart(cakes)} className="btn btn-primary">Add To Cart</button>
                    </div>
                </div>
            </div> */}
            {/* <h2>Similar Products</h2>
            <div className="row">
                {
                    relatedCakes.map((each, index) => {
                        return (
                            <Cake data={each} key={index} page="details"/>
                        )
                    })
                }
            </div> */}
        </div>
    )
}

CakeDetails = connect(function (state, props){
    if (state.CartReducer.success) {
        props.history.push('/cart')
        state.CartReducer.success = false
    }
})(CakeDetails);

export default withRouter(CakeDetails)