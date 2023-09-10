import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Textarea } from '@mantine/core';
const Footer1 = () => {
    return (
        <div className='bottom_controls'>
          
               <Link to="/explore">Contact</Link> 
                
               <Link  to="/terms&services"> Terms & Services </Link>
          
                
                </div>
       

    );
};

export default Footer1;