import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    shippingAddresses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress'
    }]
}, {
    // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
    timestamps: true
});

// Define a method in userSchema.
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Cannot use arrow function here since we are using "this" keyword.
    return await bcrypt.compare(enteredPassword, this.password);
};

// Hash the password before saving it into the database.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;