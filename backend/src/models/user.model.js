import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    street:   { type: String, required: true },
    city:     { type: String, required: true },
    country:  { type: String, required: true },
    zip:      { type: String, required: true },
    phone:    {
        type: String,
        required: true,
        match: [/^\d+$/, 'Phone number must contain only digits']
    },
    isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
    username: { type: String },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    addresses: [addressSchema]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
