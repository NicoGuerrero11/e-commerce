import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

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

export const getOrderById = async (req, res) => {
    const {id} = req.params
    try{
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid order ID format"})
        }
        const orderId = await Order.findById(id)
        if(!orderId) return res.status(404).json({message:"Order not found"})
        if (orderId.user.toString() !== req.user.id){
            return res.status(403).json({message:"User not authorized"})
        }
        res.status(200).json({
            message:"Order retrieved successfully",
            order: orderId
        })
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const cancelOrder = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"Invalid order ID format"})
    }
    const order = await Order.findById(id)
    if (!order) return res.status(404).json({message:"Order not found"})

    if(order.user.toString() !== req.user.id){
        return res.status(403).json({message:"User not authorized"})
    }
    if(order.status !== 'pending'){
        return res.status(400).json({message:"Order cannot be cancelled"})
    }
    order.status = 'cancelled'
    await order.save();
    res.status(200).json({message:"Order cancelled successfully"})


}

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find()
            .populate('user','email')
            .sort({createdAt:-1})
        res.status(200).json({
            message:"Orders retrieved successfully",
            orders
        })
    }catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid order ID format' });
        }
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const allowedStatuses = ['pending', 'paid', 'shipped', 'cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }
        order.status = status;
        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


