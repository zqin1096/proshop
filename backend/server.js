import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

// The req object represents the HTTP request.
// req.params: An object containing properties mapped to the named route “parameters”. For example, if you have the
// route /user/:name, then the "name" property is available as req.params.name.
app.get('/api/products/:id', (req, res) => {
    const product = products.find((product) => {
        return product._id === req.params.id;
    });
    res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});