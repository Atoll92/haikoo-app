import React from 'react';
import Loginalt from './Loginalt';
import { Link } from 'react-router-dom';

const Culture = () => {
    return (
       <><Loginalt></Loginalt>
        <div id="presentation" className='culture'>
              Hi there, wanna know about <Link to="https://en.wikipedia.org/wiki/Haiku#:~:text=Traditional%20Japanese%20haiku%20consist%20of,a%20kigo%2C%20or%20seasonal%20reference.">Haikoos</Link>?

        </div>
        </>
    );
};

export default Culture;