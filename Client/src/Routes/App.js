
import '../index.css';
import '../App.css';

import Haikoo from './Haikoo';
import { Link } from 'react-router-dom';
import Loginalt from './Loginalt';


function App() {

  
  return (
    <div className="App">
      <Loginalt/>
      <p>Haikoo is a creative writing puzzle game with endless solutions.<br/> Play with your friends through daily challenges !<br/> Explore, join the Haikoonauts community and create your own set of rules !</p>
      <Link to="/haikoo">PLAY NOW !</Link>
      
    {/* <Haikoo/> */}

    
      </div>
     
      );

}

      export default App;

   