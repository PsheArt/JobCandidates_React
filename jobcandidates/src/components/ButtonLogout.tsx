import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { logout } from '../api/auth';

const ButtonLogout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await logout();
        Cookies.remove('authToken'); 
        navigate('/'); 
    };

    return (
        <Button type="submit"  onClick={handleLogout}  variant="contained" color="primary" fullWidth>
                Выйти
        </Button>
    );
};

export default ButtonLogout;