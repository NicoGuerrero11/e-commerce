import { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function UserMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    let user = null;

    if (token) {
        try {
            user = jwtDecode(token);
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            console.error('Invalid token:');
        }
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileClick = () => {
        handleMenuClose();
        navigate('/profile');
    };
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        handleMenuClose();
        navigate('/login');
    };

    if (!user) return null;
  return (
    <>
        <IconButton onClick={handleMenuOpen}>
        <Avatar>{user.email[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="body2">{user.email}</Typography>
        </MenuItem>
        <MenuItem onClick={handleProfileClick}>Editar Perfil</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Cerrar Sesión</MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
