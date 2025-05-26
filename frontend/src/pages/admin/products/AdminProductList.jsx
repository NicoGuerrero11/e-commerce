import {useEffect, useState} from 'react'
import axios from 'axios'
import{
Container,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert
}from '@mui/material'
import {useNavigate} from 'react-router-dom'

function AdminProductList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get('http://localhost:3000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(res.data)
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to fetch products')
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }
    , [])

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`http://localhost:3000/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(products.filter(product => product._id !== id))
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Failed to delete product')
        }
    };
    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        )
    }
    if (error) {
        return (
            <Container>
                <Alert severity="error">{error}</Alert>
            </Container>
        )
    }
  return (
    <Container>
        <Box sx={{mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h4">Admin: Product List</Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/products/new')}>
                Create Product
            </Button>
        </Box>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map(product => (
                    <TableRow key={product._id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>${product.countInStock}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={() => navigate(`/admin/products/${product._id}/edit`)}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(product._id)} sx={{ml: 2}}>
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Container>
  );
}

export default AdminProductList
