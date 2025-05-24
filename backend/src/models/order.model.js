import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            name:{type:String,required: true},
            price:{type:Number,required: true},
            quantity:{type:Number,required: true},
            productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required: true}
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        street:   { type: String, required: true },
        city:     { type: String, required: true },
        country:  { type: String, required: true },
        zip:      { type: String, required: true },
        phone:    {type: String, required: true}
    },
    status:{
        type: String,
        enum: ['pending', 'paid', 'shipped', 'cancelled'],
        default: 'pending'
    },
    total:{
        type: Number,
        required: true
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
export default Order;