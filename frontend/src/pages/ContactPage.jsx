import React, {useEffect} from 'react';
import { List, ListItem, ListItemText, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { contactsList } from '../consts/contacts';
import { Fonts } from '../consts/font1';

const ContactPage = () => {
    const location = useLocation();

    // Сохранение текущего пути при каждом изменении
    useEffect(() => {
        localStorage.setItem('location', location.pathname);
    }, [location.pathname]);

    return (
        <Container>
            <Container maxWidth="xl" sx={{ height: "20vh" }}>
                {/* Placeholder if needed */}
            </Container>
            <Container maxWidth="sm" sx={{
                p: 4,
                borderRadius: '10px', 
                backgroundColor: "rgba(0, 0, 0, 0.115)",
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                flexDirection: "column"
            }}>
                <Typography variant="h3" style={Fonts.fontNSize}>CONTACTS</Typography>
                <List sx={{ width: '100%' }}>
                    {contactsList.map((obj, index) => 
                        <ListItem key={index}>
                            <ListItemText
                                primary={`• ${obj.primary}`}
                                primaryTypographyProps={Fonts.fontHSize}
                                secondary={`"${obj.secondary}"`}
                                secondaryTypographyProps={{ sx: { margin: "0", ...Fonts.fontHSize } }}
                            />
                        </ListItem>
                    )}
                </List>
            </Container>
        </Container>
    );
};

export default ContactPage;