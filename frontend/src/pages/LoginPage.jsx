import React, { useState } from 'react';
import { Typography, Box, Container, TextField, Button, Link } from '@mui/material';
import { observer } from 'mobx-react';
import authStore from '../store/AuthStore';
import { Fonts } from '../consts/font1';
import { useNavigate } from 'react-router-dom';

const LoginPage = observer(() => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (event) => {
        try {
            event.preventDefault();
            authStore.login(username, password);
            navigate('/');
        } catch (error) {
            console.log(error)
        }
        
    };

    const handleRegister = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            authStore.register(username, password);
            navigate('/');
        } else {
            alert("Passwords do not match!");
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh" }}>
            <Container maxWidth="xs" sx={{ borderRadius: '10px', backgroundColor: "rgba(0, 0, 0, 0.115)", p: 4, display: "flex", flexDirection: "column"}}>
                <Typography variant="h4" sx={Fonts.fontNSize}>{isLogin ? "Login to Your Account" : "Create Your Account"}</Typography>
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                    <TextField fullWidth required label="Username" margin="normal" type="text"
                        value={username} onChange={e => setUsername(e.target.value)} />
                    <TextField fullWidth required label="Password" margin="normal" type="password"
                        value={password} onChange={e => setPassword(e.target.value)} />
                    {!isLogin && (
                        <TextField fullWidth required label="Confirm Password" margin="normal" type="password"
                            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    )}
                    <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                        {isLogin ? "Login" : "Register"}
                    </Button>
                    <Link component="button" variant="body2" onClick={toggleMode} sx={{ mt: 2 }}>
                        <Typography variant="button" sx={Fonts.fontHSize}>
                            {isLogin ? "Need an account? Register" : "Have an account? Login"}
                        </Typography>
                        
                    </Link>
                </form>
            </Container>
        </Box>
    );
});

export default LoginPage;
