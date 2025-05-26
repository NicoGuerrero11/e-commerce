import {useState} from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Snackbar,
    Alert
}from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', {
                email,
                password,
                username
            });
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    }
    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom>Register</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{mt: 2}}>
                        Register
                    </Button>
                </form>
                {error && (
                    <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
                        <Alert onClose={() => setError('')} severity="error" sx={{width: '100%'}}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
            </Box>
        </Container>
    );
}

export default Register;