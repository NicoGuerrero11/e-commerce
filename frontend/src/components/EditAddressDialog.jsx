import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';
import axios from 'axios';

export default function EditAddressDialog({ address, onClose, onSave }) {
  const [data, setData] = useState({ ...address });
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleSave = async () => {
    const res = await axios.put(`/api/users/profile/address/${address._id}`, data, authHeader);
    onSave(res.data.address);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Editar dirección</DialogTitle>
      <DialogContent>
        {['fullName','street','city','country','zip','phone'].map(field => (
          <TextField
            key={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            fullWidth margin="normal"
            value={data[field]}
            onChange={e => setData({ ...data, [field]: e.target.value })}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
