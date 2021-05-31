import cakes from "./data"
import Cake from "./Cake"
function Cakelist(){
    return(   
       <div className="row">
           {cakes.map((each,index)=>{
               return (<Cake data={each} key={index} />)
           })}
       </div>
    )
}
export default Cakelist;