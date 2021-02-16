import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import {errorHandler, notFound} from "./middlewares/errorMiddleware.js";
import colors from 'colors';
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();
// express.json() parses incoming requests with JSON payloads.
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body),
// or an empty object ({}) if there was no body to parse, the Content-Type was not matched, or an error occurred.
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

// If no matching route is found, it proceeds to the notfound handler.
app.use(notFound);

// Define error-handling middleware functions in the same way as other middleware functions, except with four arguments
// instead of three, specifically with the signature (err, req, res, next)).
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
});