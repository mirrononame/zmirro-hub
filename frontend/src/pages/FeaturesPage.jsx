import React, {useEffect, useState} from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { Box, Container } from '@mui/material';
import { Fonts } from '../consts/font1';

import { featuresList } from '../consts/features';
import { useLocation } from 'react-router-dom';

function FeaturesPage() {

    const [location, setLocation] = useState(useLocation())

    useEffect(() => {
        localStorage.setItem('location', location.pathname)
        setLocation(location)
      }, [location])


    return(
        <Box>
            <Container maxWidth="xl" sx={{ height: "10vh"}}>
                {/* Костыль */}
            </Container>
            <Container maxWidth="sm" sx={
                {
                    p: 4, 
                    display: "flex", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    flexDirection: "column",
                    borderRadius: '10px', 
                    backgroundColor: "rgba(0, 0, 0, 0.115)",
                }
            }>
                <Typography variant="h3" sx={Fonts.fontNSize}> FEATURES</Typography>
                <List>
                    {featuresList.map((obj) => 
                        <ListItem>
                            <ListItemText
                                primary={`• ${obj.primary}`}
                                primaryTypographyProps={{...Fonts.fontHSize}}
                                secondary={`"${obj.secondary}"`}
                                secondaryTypographyProps={{sx: {margin: "20px 0 0 20px" ,...Fonts.fontHSize}}}
                            />
                        </ListItem>
                    )}
                </List>
            </Container>
        </Box>
    );
    };

export default FeaturesPage;