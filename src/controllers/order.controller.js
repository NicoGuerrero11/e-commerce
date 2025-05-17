import Order from '../models/order.model';
import Product from '../models/product.model.js';

export const createOrder = async (req, res) => {
    const {products, shippingAddress} = req.body;
    let total = 0;
    const processedProducts = []
    try{
        if(!products || !Array.isArray(products) || products.length === 0){
            return res.status(400).json({message:"Products are required"})
        }
        if(!shippingAddress || !shippingAddress.fullName || !shippingAddress.street){
            return res.status(400).json({message:"Shipping address is incomplete"})
        }
        for (const item of products) {
            const {productId, quantity} = item;

            if(!productId || quantity <= 0){
                return res.status(400).json({message:"Invalid product data"})
            }
            const product = await Product.findById(productId)
            if(!product){
                return res.status(404).json({message:`Product not found: ${productId}`})
            }

            const subTotal = product.price * quantity;
            total += subTotal;

            processedProducts.push({
                name: product.name,
                price: product.price,
                quantity,
                productId
            })
        }
        const newOrder = new Order({
            user: req.user.id,
            products: processedProducts,
            shippingAddress,
            total
        });

        await newOrder.save();

        res.status(201).json({
            message: "Order created successfully",
            order: newOrder
        });

    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const getUserOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user.id}).sort({createdAt:-1})
        res.status(200).json({
            message:"Orders retrieved successfully",
            orders
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}