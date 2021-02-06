import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import colors from 'colors';
import productRouter from "./routes/productRoutes.js";
import {notFound, errorHandler} from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRouter);

// If no matching route is found, it proceeds to the notfound handler.
app.use(notFound);

// Define error-handling middleware functions in the same way as other middleware functions, except with four arguments
// instead of three, specifically with the signature (err, req, res, next)).
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
});