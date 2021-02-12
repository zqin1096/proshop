import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDBn from "./config/db.js";
import {ShippingAddress} from "./models/shippingAddressModel.js";

dotenv.config();
connectDBn();

const importData = async () => {
    try {
        // Clear all existing data.
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await ShippingAddress.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser};
        });
        await Product.insertMany(sampleProducts);
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // Clear all existing data.
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
};
// This file is not part of the application. It is executed separately.

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}