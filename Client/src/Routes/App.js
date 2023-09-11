
import '../index.css';
import '../App.css';

import Haikoo from './Haikoo';
import { Link } from 'react-router-dom';
import Loginalt from './Loginalt';
import StoreUserData from '../Components/StoreUserData';


function App() {

  
  return (
    <div className="App">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9483694345254281"
     crossorigin="anonymous"></script>
     <Loginalt /> 
    
      {/* <p>Haikoo is a creative writing puzzle game with endless solutions.<br/> Play with your friends through daily challenges !<br/> Explore, join the Haikoonauts community and create your own set of rules !</p> */}
      {/* <Link to="/haikoo">PLAY NOW !</Link> */}
      <Haikoo/>
    {/* <Haikoo/> */}

    
      </div>
     
      );

}

      export default App;

   