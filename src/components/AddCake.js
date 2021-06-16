import axios from "axios"
import { useState } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { Icon } from 'react-icons-kit';
import {plusCircle} from 'react-icons-kit/fa/plusCircle';
import {minusCircle} from 'react-icons-kit/fa/minusCircle';


function AddCake(props){
    if (!localStorage.getItem('email')==='deepika.dubey@neosoftmail.com' || localStorage.getItem('email')==='ashu.lekhi0540@gmail.com') {
        props.history.push('/login')
    }

    var [cakeName,setCakeName]=useState('')
    var [cakeDesc,setCakeDesc]=useState('')
    var [cakePrice,setCakePrice]=useState('')
    var [cakeFlav,setCakeFlav]=useState('')
    var [cakeType,setCakeType]=useState('')
    var [cakeWeight,setCakeWeight]=useState('')
    var [cakeEggless,setCakeEggless]=useState(false)
    var [cakeImage,setCakeImage] = useState('')
    var [cakeIngredients,setCakeIngredients] = useState([{value: ''}])

    var cakeIngredientsElements=[]

    function handleValidations(){
      
        
        return    cakeImage  !=='' && cakeName !=='' && cakePrice !=='' && cakeType !=='' && cakeFlav !=='' && cakeWeight !=='';
             
        }
        const handlePlusClick = (e) => {
         
                setCakeIngredients([...cakeIngredients, { value: ''}]);
      
           
          };
          const handleMinusClick = (index) => {
             
            const list = [...cakeIngredients];
            list.splice(index, 1);
            setCakeIngredients(list);
        
          };
          const handleInputChange = (event, index) => {
              event.preventDefault()
              const list = [...cakeIngredients];
              list[index].value = event.target.value;
              setCakeIngredients(list);
              console.log(cakeIngredients)
        }
    
    const handleOnSubmit=(event)=>{
        // alert("Cl")
        event.preventDefault();
        cakeIngredients.map((each, index) => {
            cakeIngredientsElements.push(each.value)
        })
        //console.log("ingredeint",cakeIngredientsElements)
        props.dispatch({
            type: 'ADD_CAKE',
            payload: {name: cakeName, description: cakeDesc, price: cakePrice, weight: cakeWeight, image: cakeImage,
                type: cakeType, eggless: cakeEggless, flavour: cakeFlav, ingredients: cakeIngredientsElements,history:props}
        })
        
        cakeIngredientsElements = []
    }
    const fileUpload = (event)=>{
        setCakeImage(URL.createObjectURL(event.target.files[0]))
        let formData = new FormData()
        formData.append('file', event.target.files[0])
        // axios
        axios({
            url: process.env.REACT_APP_API_BASE_URL + '/upload',
            method: 'post',
            headers:{
                authtoken:localStorage.token
            },
            data: formData
        }).then(res => {
            setCakeImage(res.data.imageUrl)
            
        }, err => {})
    }
    return(
        <>
        <div className="container text-center mb-0 mt-5">
          <strong style={{fontSize: "30px"}}>Add Cake</strong>
          <hr/>
        </div>
        <div className="p-5 mt-5 container">
           
            <form onSubmit={handleOnSubmit}>
            <div className="mb-3 row" >
                <label for="formFile" className=" col-sm-2 col-form-label">Image Upload <span style={{color:"red"}}>*</span></label>
                <div className={`${cakeImage?'col-sm-4' :' col-sm-10'}`}>
                    <input className="form-control" onChange={fileUpload}  type="file" id="formFile"/>
                </div>
                {cakeImage && <div className="col-sm-4  " style={{height:"100px"}}>
                        <img src={cakeImage} height="100px" alt="cake" width="100px"/>
                    </div>}
            </div>
            <div className="mb-3 row">
                <label for="cake_name" className="col-sm-2 col-form-label"> Cake Name <span style={{color:"red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="text" readonly className="form-control" id="cake_name" onChange={(e)=>{setCakeName(e.target.value)}} value={cakeName}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label for="cake_desc" className="col-sm-2 col-form-label">Cake Description<span style={{color:"red"}}>*</span></label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="cake_desc" onChange={(e)=>{setCakeDesc(e.target.value)}} value={cakeDesc}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label for="price" className="col-sm-2 col-form-label">Price<span style={{color:"red"}}>*</span></label>
                <div className="col-sm-4">
                <input type="number" className="form-control" id="price" value={cakePrice} onChange={(e)=>{setCakePrice(e.target.value)}}/>
                </div>
                <label for="weight" className="col-sm-2 text-center col-form-label">Weight<span style={{color:"red"}}>*</span></label>
                <div className="col-sm-4">
                <input type="number" className="form-control" id="weight" value={cakeWeight} onChange={(e)=>{setCakeWeight(e.target.value)}} />
                </div>
            </div>
            <div className="mb-3 row">
                <label for="type" className="col-sm-2 col-form-label">Type<span style={{color:"red"}}>*</span></label>
                <div className="col-sm-10">
                    <select className="form-select"  value={cakeType} onChange={(e)=>{setCakeType(e.target.value)}} aria-label="Default select example">
                        <option value="" disabled>Select Type</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="farewell">Farewell</option>
                    </select>
                </div>
            </div>
            <div className="mb-3 row">
                <label for="check" className="col-sm-2 col-check-label">EggLess</label>
                <div className="col-sm-4 pl-4">
                <input className="form-check-input" style ={{height:"36px" , width:"30px"}} type="checkbox" value={cakeEggless} onChange={(e)=>{setCakeEggless(true)}} id="check" />
                </div>
                <label for="flavour" className="col-sm-2 text-center col-form-label">flavour<span style={{color:"red"}}>*</span></label>
                <div className="col-sm-4">
                <input type="text" className="form-control" id="flavour" value={cakeFlav} onChange={(e)=>{setCakeFlav(e.target.value)}}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label for="flavour" className="col-sm-2  col-form-label">ingredients</label>
                <button  type="button" className="btn btn-primary" style={{height:"35px"}} onClick={handleMinusClick} ><span>
                            <Icon icon={minusCircle}/>
                            </span></button>
                {cakeIngredients.map((x, i) => {
                    return  <div className="mb-3" style={{width:"443px"}}>
                    <input type="text"className="form-control " onChange={e => handleInputChange(e, i)} id="flavour" />
                    
                     </div>;
                })}
               
                <button   type="button" className="btn btn-primary" style={{height:"35px"}} onClick={handlePlusClick} ><span>
                            <Icon icon={plusCircle}/>
                            </span></button>
            </div>
            <div className="col-12">
                <button className="btn btn-primary" disabled={!handleValidations()}>Submit form</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default connect() (withRouter(AddCake))