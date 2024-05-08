import React from 'react';
import { Typography } from '@mui/material';
import { Box, Container, Button } from '@mui/material';
// import ParticlesComponent from '../components/particles';
import { Fonts } from '../consts/font1';
import { useNavigate } from 'react-router-dom';
import authStore from '../store/AuthStore';
import { observer } from 'mobx-react';

const HomePage = observer(() => { // Обертываем функциональный компонент в observer
    const navigate = useNavigate();

    const handleClick = () => {
        if (!authStore.isLoggedIn) {
            console.log('User is not authenticated, navigating to login...');
            navigate('/login');
        } else {
            console.log('User is authenticated, navigating to server creation...');
            window.location.href = 'https://fshost.me/';
        }
    };

    return (
        <Box maxWidth={"100vw"}>
            <Container maxWidth="xl" sx={{width: "100vw", height: "34vh"}}>
                {/* Возможное место для вашего компонента Particles */}
            </Container>
            <Container maxWidth="xs" sx={{
                borderRadius: '10px', 
                backgroundColor: "rgba(0, 0, 0, 0.115)",
                padding: "20px"
            }}>
                <Typography variant="h3" component="h2" gutterBottom align='center' sx={Fonts.fontNSize}>
                    HI THERE
                </Typography>
                <Button fullWidth variant="outlined" color="secondary" onClick={handleClick}>
                    Create Server
                </Button>
            </Container>
        </Box>
    );
});

export default HomePage;