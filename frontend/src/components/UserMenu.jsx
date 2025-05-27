import { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function UserMenu({user}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

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

    
  return (
    <>
        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }} color='inherit'>
            <Avatar>{user.email[0].toUpperCase()}</Avatar>
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
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
