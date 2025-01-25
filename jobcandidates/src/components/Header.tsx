import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import  ButtonLogout  from './ButtonLogout'


const Header: React.FC = () => {
    const authToken = Cookies.get('authToken');
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={Link} to="/">Логотип</Button>
                </Typography>
                <Button color="inherit" component={Link} to="/candidates">Управление кандидатами</Button>
                <Button color="inherit" component={Link} to="/interviews">Управление собеседованием</Button>
                <Button color="inherit" component={Link} to="/assignments">Управление тестовыми заданиями</Button>
                  {authToken ? (
                   <ButtonLogout/>
                   ) : (
                        <Button color="inherit" component={Link} to="/login">Вход</Button>
                   )}
               
            </Toolbar>
        </AppBar>
    );
};

export default Header;
