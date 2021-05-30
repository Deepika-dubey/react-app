import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Signup from "./components/Signup"

function App() {
  var details = {
    projectname :"My Cake",
    username:"Deepika Dubey"
}
  return (
    <div>
      <Navbar details={details} project="Deepika Cakeshop" y="30" name="Deepika"  phone="123456"></Navbar>
      <Carousel></Carousel>
      <Signup></Signup>
    </div>
  );
}

export default App;