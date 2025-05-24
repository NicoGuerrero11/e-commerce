import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// create product
export const createProduct = async (req, res) => {
    const {name, price, countInStock, image} = req.body;
    try{
        if(!name || !price || !countInStock || !image) return res.status(400).json({message:"Please provide all required fields"})
        if(countInStock < 0 || price <= 0 ) return res.status(400).json({message:"Invalid product data"})

        const newProduct = new Product({
            name,
            price,
            countInStock,
            image
        })
        await newProduct.save();
        res.status(201).json(
            {
                message:"Product created successfully",
                product:{
                    id:newProduct._id,
                    name:newProduct.name,
                    price:newProduct.price,
                    countInStock:newProduct.countInStock,
                    image:newProduct.image
                }
            })
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// show all the products
export const getAllProducts = async (req, res) => {
    try{
        const allProducts = await Product.find().sort({ createdAt: -1})
        res.status(200).json(allProducts)
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

// show a specific product
export const getProductById = async (req, res) => {
    const {id} = req.params;

    // validate if id is correct
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }
    try{
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({message:"Product not found"})
        res.status(200).json(product)
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

//update product
export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const {name, price, countInStock, image} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }
    try{
        // validate if price and countInStock is correct
        if (price <= 0 || countInStock < 0) {
            return res.status(400).json({ message: "Invalid product data" });
        }

        // update product
        const product = await Product.findByIdAndUpdate(
            id,
            {name, price, countInStock, image},
            {new:true}
        )

        // if product not found
        if(!product) return res.status(404).json({message:"Product not found"})


        res.status(200).json({
            message:"Product updated successfully",
            product
        })
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params
    // validate if id is correct
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid product ID format' });
    }
    try{
        // delete product
        const productDelete = await Product.findByIdAndDelete(id)
        if(!productDelete) return res.status(404).json({message:"Product not found"})
        res.status(200).json({message:"Product deleted successfully"})
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}