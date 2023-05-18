const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');
const Product = require("../models/product.model");

// Create and Save a new product
exports.create = async (req, res, next) => { // .create: tao document trong collection

    // Validate request
    if(!req.body.name) {
        return next(new BadRequestError(404, "Name can not be empty"));
    }

    // Create a new product
    const product = new Product({
        code: req.body.code,
        name: req.body.name,
        // slug: req.body.slug,
        quantity: req.body.quantity,
        price: req.body.price,
        category: req.body.category,
        images: req.body.images,
        description: req.body.description,
    });

    try {
        // Save in the database
        const document = await product.save();
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while creating the products"
            )
        );
    }
};

// Retrieve all products of a user from the database
exports.findAll = async (req, res, next) => {

    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" };
    }

    try {
        const document = await Product.find(condition);
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while retrieving Product"
            )
        );
    }
};


// Find a single product with an id
exports.findOne = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Product.findOne(condition);
        if(!document) {
            return next(new BadRequestError(404, "Products not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error retrieving products with id = ${req.params.id}`
            )
        );
    }
};

// Update a products by the id in the request
exports.update = async (req, res, next) => {

    if(Object.keys(req.body).length === 0) {
        return next(
            new BadRequestError(400,"Data to update can not be empty"));
    }

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Product.findOneAndUpdate(condition, req.body, {
            new: true,
        });
        if(!document) {
            return next(new BadRequestError(404, "product not found"));
        }
        return res.send({ message: "product was updated successfully", });
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error updating product with id=${req.params.id}`
            )
        );
    }
};


// Delete a product with the specified id in the request
exports.delete = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };


    try {
        const document = await Product.findOneAndDelete(condition);
        if(!document) {
            return next(new BadRequestError(404, "product not found"));
        }
        return res.send({ message: "product was deleted successfully", });  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Could not delete product with id=${req.params.id}`
            )
        );
    }
};

// Delete all products of a user from the database
exports.deleteAll = async(req, res, next) => {

    try {
        const data = await Product.deleteMany({});
        return res.send({
            message: `${data.deletedCount} products was deleted successfully`
        }); 
    } catch (error) {
        return next(
            new BadRequestError(
                500,`An error occurred while removing all products`
            )
        );
    }
};