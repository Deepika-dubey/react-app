import {call, takeEvery, put, all} from "redux-saga/effects"
import axios from "axios";
import { Redirect } from "react-router-dom";

const addCake = (action) => {
    console.log("saga cake res",action.payload);
    
    return axios({
        url: process.env.REACT_APP_API_BASE_URL + '/addcake',
        method: "post",
        headers:{
            authtoken:localStorage.token,
        },
        data: action.payload || {}
    }).then((res)=>{
        return res.data
    },(error)=>{ })
}

export function *AddCakeGenerator(action, props) {
    let result = yield(call(addCake, action))
    const { history } = action.payload.history;
    if (result.data) {
        //toast.success("New Cake Added");
        // toast.warning(result.data.cakeid)
       history.push("/cake/"+result.data.cakeid);
       
        yield put({
            type: "ADD_CAKE_SUCCESS",
            payload: result.data
        });
    } else {
        //toast.warning("Opps ! something failed")
        yield put({
            type: "ADD_CAKE_FAILURE"
        })
       
    }
}

function *AddCakeSaga() {
    yield takeEvery('ADD_CAKE', AddCakeGenerator)
}
export default function *MainSaga() {
    yield all([AddCakeSaga()])
}