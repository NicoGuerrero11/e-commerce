import { Container, Typography, Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const token = localStorage.getItem('token');
  const user = token ? jwtDecode(token) : null;

    // If the user is not logged in, show a message  
  if (!user) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6"> not logged </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Rol:</strong> {user.role}</Typography>
      </Box>
    </Container>
  );
};

export default Profile;