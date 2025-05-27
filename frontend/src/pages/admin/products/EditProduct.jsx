import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import ProductForm from '../../../components/ProductForm';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:3000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInitialData(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Failed to fetch product data');
      }
    };

    fetchProduct();
  }
  , [id]);

  const handleUpdate = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:3000/api/products/${id}`,formData,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/admin/products');
      // eslint-disable-next-line no-unused-vars
    }catch (err) {
      setError('Failed to fetch product data');
    }
  };
  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  if (!initialData) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }


  return (
    <Container>
      <ProductForm
        initialData={initialData}
        onSubmit={handleUpdate}
        title="Edit Product"
      />
    </Container>
  )
}

export default EditProduct