import React, {useEffect} from 'react';
import { Typography } from '@mui/material';
import { Box, Container, TextField, Button } from '@mui/material';
import { Fonts } from '../consts/font1';
import { useLocation } from 'react-router-dom';


const NotFound = () => {

    let location = useLocation();

    useEffect(() => {
        console.log('location: ', location)
        localStorage.setItem('location', location.pathname)
      }, [location])

    return (
        <Container maxWidth="xs">
        <Container maxWidth="xl" sx={{ height: "30vh"}}>
            
        </Container>
        <Typography variant="h1" display={"flex"} justifyContent={"center"} textAlign={"center"} margin={"0vh 0 0 0"} sx={Fonts.fontNSize}>
            404  
        </Typography>
        <Typography variant="h1" display={"flex"} justifyContent={"center"} textAlign={"center"} margin={"0vh 0 0 0"} sx={Fonts.fontNSize}>
            NoT FoUnD
        </Typography>
    </Container>
    )
    
  
};

export default NotFound;