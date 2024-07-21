import React, { useState, useCallback } from 'react';
import { TextField, Button, Box, Typography, Container, Alert } from '@mui/material';
import { createToken } from '@/service/RmosApi';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const fetchAndSetBearerToken = useCallback(async (userName: string, password: string) => {
        try {
            const response = await createToken({ userName, password });
            localStorage.setItem('authToken', response);
            return response;
        } catch (error) {
            console.error('Failed to fetch and set token:', error);
            return null;
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (username && password) {
            const token = await fetchAndSetBearerToken(username, password);
            if (token) {
                window.location.reload();
            } else {
                setError('Kimlik doğrulaması başarısız oldu. Lütfen tekrar deneyin.');
            }
            return;
        }

        setError('Tüm alanları doldurun.');
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '95vh',
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Typography variant="h5" component="h1" mb={2}>
                    Giriş Yap
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <TextField
                    label="Kullanıcı Adı"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Şifre"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Giriş Yap
                </Button>
            </Box>
        </Container>
    );
};

export default Login;