import {useEffect, useState} from 'react';
import axios from 'axios';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Container,
    CircularProgress,
    Alert
} from '@mui/material';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/products');
                setProducts(res.data);``
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    if (loading) {
        return (
            <Container sx={{mt:4, textAlign: 'center'}}>
                <CircularProgress />
            </Container>
        );
    }
    if (error) {
        return (
            <Container sx={{mt:4}}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }
    return (
        <Container sx={{mt: 4}}>
            <Grid container spacing={4}>
                {products.map((product) => (
                    <Grid size={{xs:12, sm:6, md:4}} key={product._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="180"
                                image={product.image || 'https://via.placeholder.com/300x180?text=No+Image'}
                                alt={product.name}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${product.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Products;