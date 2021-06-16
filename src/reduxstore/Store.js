import {createStore,combineReducers,applyMiddleware} from "redux"
import AuthReducer from "./AuthReducer"
import CartReducer from "./CartReducer"
import thunk from "redux-thunk"
import createSaga from "redux-saga"
import MainSaga from "./sagas";


let middle = store=>next =>action =>{
    //alert("reducer middleware")
    next(action)
}
var SagaMiddleware = createSaga()
let reducers=combineReducers({AuthReducer,CartReducer})
let store = createStore(reducers,applyMiddleware(middle,thunk,SagaMiddleware))

SagaMiddleware.run(MainSaga)

export default store