import {useState} from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'

function ProductForm({initialData = {}, onSubmit, formTitle}) {
    const [name, setName] = useState(initialData.name || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [countInStock, setCountInStock] = useState(initialData.countInStock || '');
    const [image, setImage] = useState(initialData.image || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(price < 0 || countInStock < 0) {
            alert('Price and Count In Stock must be non-negative'); 
            return;
        }

        onSubmit({name, price, countInStock, image});
    }
  return (
    <Box  sx={{ mt: 4 }}>
        <Typography variant='h5' gutterBottom>{formTitle}</Typography>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Product Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <TextField
                label="Price"
                type="number"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{ min: 0 }}
                required
            />
            <TextField
                label="Count In Stock"
                type="number"
                fullWidth
                margin="normal"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                inputProps={{ min: 0 }}
                required
            />
            <TextField
                label="Image URL"
                fullWidth
                margin="normal"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                
            />
            <Button variant='contained' color='primary' type='submit' sx={{ mt: 2 }}>
                Submit
            </Button>
        </form>
    </Box>
  )
}

export default ProductForm
