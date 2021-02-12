import mongoose from "mongoose";

export const shippingAddressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true

    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    usedAt: {
        type: Date
    }
}, {
    timestamps: true
});

export const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);