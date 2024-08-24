import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true

    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            min: 1
        },
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentInfo: {
        method: {
            type: String,
            required: true
        },
    },
    shippingAddress: {
        address: {
            type: String,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true

        },
        postalCode: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true

        }
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order
