
import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Alert } from '@mui/material';
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const FormLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await login(username, password);
        const token = response.token;
        Cookies.set('authToken', token, { expires: 7 });
        navigate('/');

    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center">Вход</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Имя пользователя"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <Alert severity="error">{error}</Alert>}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Войти
                </Button>
            </form>
        </Container>
    );
};

export default FormLogin;
