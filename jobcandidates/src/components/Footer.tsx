import React from 'react';
import { TableFooter, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <TableFooter component="tfoot" >
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Логотип
                </Typography>
                <Button color="inherit" component={Link} to="/">Управление кандидатами</Button>
                <Button color="inherit" component={Link} to="/interviews">Управление собеседованием</Button>
                <Button color="inherit" component={Link} to="/assignments">Управление тестовыми заданиями</Button>
                <Button color="inherit" component={Link} to="/login">Вход</Button>
            </Toolbar>
        </TableFooter>
    );
};

export default Footer;
