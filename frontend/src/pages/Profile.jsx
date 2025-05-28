import { useEffect, useState } from 'react';
import {
  Container, Tabs, Tab, Box,
  TextField, Button, Snackbar, Alert,
  List, ListItem, ListItemText, IconButton, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import AddressForm from '../components/AddressForm';
import EditAddressDialog from '../components/EditAddressDialog';
// import { jwtDecode } from 'jwt-decode';

export default function Profile() {
  const [tab, setTab] = useState(0);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [password, setPassword] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'info' });
  const [editingAddr, setEditingAddr] = useState(null);

  const token = localStorage.getItem('token');
  // const user = token ? jwtDecode(token) : null;
  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  // Cargar perfil y direcciones
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/api/users/profile',
          authHeader
        );
        setUserData({ username: data.username, email: data.email });
        setAddresses(data.addresses);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  const handleTab = (_, v) => setTab(v);

  // Guardar cambios de perfil
  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        'http://localhost:3000/api/users/profile',
        { ...userData, ...(password && { password }) },
        authHeader
      );
      setSnack({ open: true, message: 'Perfil actualizado', severity: 'success' });
      setPassword('');
    } catch (err) {
      setSnack({
        open: true,
        message: err.response?.data?.message || 'Error al actualizar perfil',
        severity: 'error'
      });
    }
  };

  // Agregar dirección
  const handleAddAddress = async (addr) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/profile/address',
        addr,
        authHeader
      );
      setAddresses([...addresses, res.data.address]);
      setSnack({ open: true, message: 'Dirección añadida', severity: 'success' });
    } catch {
      setSnack({ open: true, message: 'Error al añadir dirección', severity: 'error' });
    }
  };

  // Actualizar dirección
  const handleUpdateAddress = async (updated) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/users/profile/address/${updated._id}`,
        updated,
        authHeader
      );
      setAddresses(addresses.map(a => a._id === updated._id ? res.data.address : a));
      setEditingAddr(null);
      setSnack({ open: true, message: 'Dirección actualizada', severity: 'success' });
    } catch {
      setSnack({ open: true, message: 'Error al actualizar dirección', severity: 'error' });
    }
  };

  // Eliminar dirección
  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/users/profile/address/${id}`,
        authHeader
      );
      setAddresses(addresses.filter(a => a._id !== id));
      setSnack({ open: true, message: 'Dirección eliminada', severity: 'info' });
    } catch {
      setSnack({ open: true, message: 'Error al eliminar dirección', severity: 'error' });
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Mi perfil</Typography>
      <Tabs value={tab} onChange={handleTab} sx={{ mb: 2 }}>
        <Tab label="Cuenta" />
        <Tab label="Direcciones" />
      </Tabs>

      {tab === 0 && (
        <Box component="form" onSubmit={handleProfileSave} sx={{ maxWidth: 400 }}>
          <TextField
            label="Usuario"
            fullWidth margin="normal"
            value={userData.username}
            onChange={e => setUserData({ ...userData, username: e.target.value })}
          />
          <TextField
            label="Email"
            type="email" fullWidth margin="normal"
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
          />
          <TextField
            label="Nueva contraseña"
            type="password" fullWidth margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Guardar cambios
          </Button>
        </Box>
      )}

      {tab === 1 && (
        <Box>
          <List>
            {addresses.map(addr => (
              <ListItem
                key={addr._id}
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => setEditingAddr(addr)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteAddress(addr._id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${addr.fullName} — ${addr.street}, ${addr.city}`}
                  secondary={`${addr.country} ${addr.zip} · ${addr.phone}`
                    + (addr.isDefault ? ' (predeterminada)' : '')}
                />
              </ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 3 }}>Agregar nueva dirección</Typography>
          <AddressForm onComplete={handleAddAddress} />

          {editingAddr && (
            <EditAddressDialog
              address={editingAddr}
              onClose={() => setEditingAddr(null)}
              onSave={handleUpdateAddress}
            />
          )}
        </Box>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  );
}