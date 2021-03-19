import React, {useEffect, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {states} from "../utils/states";

const ProductEditModal = (props) => {

    const product = props.product;
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');

    useEffect(() => {
        if (product) {
            setName(product.name);
            setBrand(product.brand);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setCountInStock(product.countInStock)
        }
    }, [product]);

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData();
                    formData.append('image', image);
                    props.onSubmit(name, image == null ? null : formData, brand, category, description, price, countInStock, product ? product._id : undefined);
                    setName('');
                    setBrand('');
                    setCategory(states[0].state);
                    setDescription('');
                    setPrice('');
                    setCountInStock('');
                    props.onHide();
                }}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} required
                                      onChange={(event) => {
                                          setName(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.File
                            label='Image'
                            required={product == null}
                            onChange={(event) => {
                                setImage(event.target.files[0]);
                            }}/>
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter brand' value={brand} required
                                      onChange={(event) => {
                                          setBrand(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter category' value={category} required
                                      onChange={(event) => {
                                          setCategory(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' placeholder='Enter description' value={description} required
                                      onChange={(event) => {
                                          setDescription(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='text' placeholder='Enter price' value={price} required
                                      onChange={(event) => {
                                          setPrice(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count in Stock</Form.Label>
                        <Form.Control type='text' placeholder='Enter count in stock' value={countInStock} required
                                      onChange={(event) => {
                                          setCountInStock(event.target.value);
                                      }}/>
                    </Form.Group>
                    <Button variant="primary" type='submit'>
                        {props.buttonText}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductEditModal;