import {useState} from 'react';
import {TextField, Button, Container, Typography, Box, Snackbar, Alert, Link as MuiLink} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            });
            const token = res.data.token;
            localStorage.setItem('token', token);
            navigate('/products');
        }catch(err){
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8}}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit}>
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
                        Login
                    </Button>
                    <Typography variant="body2" align="center" sx={{mt: 2}}>
                        Don't have an account?{''}
                        <MuiLink component={RouterLink} to="/register" underline='hover' color='primary'> Register</MuiLink> 
                    </Typography>
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

export default Login;