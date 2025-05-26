import { useNavigate } from 'react-router-dom';
import { Container, Alert } from '@mui/material';
import ProductForm from '../../../components/ProductForm';
import axios from 'axios';
import { useState } from 'react';

function CreateProduct() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try{
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/products');
    // eslint-disable-next-line no-unused-vars
    }catch (err) {
      setError('Failed to create product');
    }
  }
  return (
    <Container>
      {error && <Alert severity="error" sx={{mt:2}}>{error}</Alert>}
      <ProductForm
        onSubmit={handleSubmit}
        formTitle="Create New Product"
      />
    </Container>
  )
}

export default CreateProduct
