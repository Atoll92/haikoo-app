import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@mantine/core';
import { Box } from '@mantine/core';

const Evaluate = () => {
    return (
        <div>
            <Box id="presentation">
            <h1>Thanks for evaluating haikoos</h1>
            <h2>Selected Haikoo now appear in your book</h2>
            </Box>
           <Link to="/"> <Button className='centered'>Bring me back to writing !</Button></Link>
            
            
        </div>
    );
};

export default Evaluate;