const express = require('express');
const products = require('./data/products');

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

app.listen(5000, () => {
    console.log('Server running on port 5000');
});