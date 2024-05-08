import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link as RouteLink, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import './css/main.css';
import './App.css'
import { Fonts } from './consts/font1';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFoundPage';
import LogOut from './pages/LogOut';
import ParticlesComponent from './components/particles';
import { observer } from 'mobx-react';
import authStore from './store/AuthStore';
import FadeInComponent from './components/FadeInComponent';
import ProfilePage from './pages/ProfilePage';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function profileButton(isLogin){
  if(!isLogin){
    return (
      ""
    )
  }
  return(
    <Button color="inherit" component={RouteLink} to={"/profile"} sx={Fonts.fontHSize}>
      PROFILE
    </Button>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = observer(() => {
  const [mode, setMode] = useState('dark');
  const [loaded, setLoaded] = useState(false);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
  }), []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    const restoreSession = async () => {
      const userData = await authStore.getUserData();
    };
    try {
      setLoaded(true);
      restoreSession();
      setLoaded(false);
    } catch (error) {
      console.log(error);
      setLoaded(false);
    }
    
  }, []);
  


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <FadeInComponent />
        <AppBar position="static" sx={{ zIndex: 1300, backgroundColor: 'transparent', boxShadow: 0, background: 0}}>
          <Toolbar>
            <Typography sx={{ flexGrow: 1}}>
              <Link variant="h2" component={RouteLink} to="/" underline="none" color="inherit" sx={Fonts.fontNSize}>
                ZMIRRO HUB
              </Link>
            </Typography>
            <Button color="inherit" component={RouteLink} to="/" sx={Fonts.fontHSize} ><HomeIcon /></Button>
            <Button color="inherit" component={RouteLink} to="/features" sx={Fonts.fontHSize}>FEATURES</Button>
            <Button color="inherit" component={RouteLink} to="/contact" sx={Fonts.fontHSize}>CONTACT</Button>
            {profileButton(authStore.isLoggedIn)}
            <Button color="inherit" component={RouteLink} to={authStore.isLoggedIn ? "/logout" : "/login"} sx={Fonts.fontHSize}>{authStore.isLoggedIn ? "LOG OUT" : "LOGIN PAGE"}</Button>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          <Route path='/features' element={<FeaturesPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/logout' element={<LogOut/>}/>
          <Route path="*" element={<NotFound />} />
          {authStore.isLoggedIn ? <Route path='/profile' element={<ProfilePage />}/> : <></>}
        </Routes>
        <ParticlesComponent style={{ zIndex: 0 }} />
      </Router>
    </ThemeProvider>
    
  );
  });

export default App;