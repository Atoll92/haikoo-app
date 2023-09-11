import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, Text, Textarea } from '@mantine/core';
const Footer1 = () => {
    // const Sendmail(){
    //     window.open('mailto:contact.doublegeste@gmail.com?subject=Contact%20Haikoo%20team&body=');
    // }
    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;
      
        return <a href={`mailto:${email}${params}`}>{children}</a>;
      };

    return (
        <div className='bottom_controls'>


         
               {/* <Text onClick={window.open('mailto:contact.doublegeste@gmail.com?subject=Contact%20Haikoo%20team&body=')} >Contact</Text>  */}
               <Mailto target="_blank" email="contact.doublegeste@gmail.com" subject="Hello Haikoo team" body="">
    Contact us!
  </Mailto>
               <Link  to="/terms&services"> Terms & Services </Link>
          
                
                </div>
       

    );
};

export default Footer1;