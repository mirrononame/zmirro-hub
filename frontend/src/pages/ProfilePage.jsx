import React, {useEffect} from 'react';
import { Typography } from '@mui/material';
import { Box, Container, TextField, Button } from '@mui/material';
import { Fonts } from '../consts/font1';

const ProfilePage = () => {

    return (
    <Container maxWidth="xs">
        <Container maxWidth="xl" sx={{ height: "30vh"}}>
            
        </Container>
        <Typography variant="h1" display={"flex"} justifyContent={"center"} textAlign={"center"} margin={"0vh 0 0 0"} sx={Fonts.fontNSize}>
            Profile 
        </Typography>
    </Container>
    )
    
  
};

export default ProfilePage;