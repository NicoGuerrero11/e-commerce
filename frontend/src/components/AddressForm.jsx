import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function AddressForm({ onComplete }) {
  const [data, setData] = useState({
    fullName: '', street: '', city: '',
    country: '', zip: '', phone: '', isDefault: false
  });
  const token = localStorage.getItem('token');
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/users/profile/address', data, authHeader);
    onComplete(res.data.address);
    setData({ fullName: '', street: '', city: '', country: '', zip: '', phone: '', isDefault: false });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mb: 4 }}>
      {['fullName','street','city','country','zip','phone'].map(field => (
        <TextField
          key={field}
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          fullWidth margin="normal"
          value={data[field]}
          onChange={e => setData({ ...data, [field]: e.target.value })}
          required
        />
      ))}
      <Button type="submit" variant="outlined" sx={{ mt: 2 }}>Guardar dirección</Button>
    </Box>
  );
}
