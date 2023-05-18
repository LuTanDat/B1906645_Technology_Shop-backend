const mongoose = require('mongoose');
const { BadRequestError } = require('../errors');
const Employee = require("../models/employee.model");

// Create and Save
exports.create = async (req, res, next) => { // .create: tao document trong collection

    // Validate request
    if(!req.body.name) {
        return next(new BadRequestError(404, "Name can not be empty"));
    }

    // Create a new employee
    const employee = new Employee({
        code: req.body.code,
        name: req.body.name,
        pw: req.body.pw,
        // slug: req.body.slug,
        email: req.body.email,
        address: req.body.address,
        dateOfBirth: req.body.dateOfBirth,
        sex: req.body.sex,
        phone: req.body.phone,
        position: req.body.position,
        images: req.body.images
    });

    try {
        // Save in the database
        const document = await employee.save();
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while creating the products"
            )
        );
    }
};

// Retrieve all of a user from the database
exports.findAll = async (req, res, next) => {

    const condition = { };
    const { name } = req.query;
    if (name) {
        condition.name = { $regex: new RegExp(name), $option: "i" };
    }

    try {
        const document = await Employee.find(condition);
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,"An error occurred while retrieving Employee"
            )
        );
    }
};


// Find a single with an id
exports.findOne = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };

    try {
        const document = await Employee.findOne(condition);
        if(!document) {
            return next(new BadRequestError(404, "Employees not found"));
        }
        return res.send(document);  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error retrieving employees with id = ${req.params.id}`
            )
        );
    }
};

// Update a employees by the id in the request
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
        const document = await Employee.findOneAndUpdate(condition, req.body, {
            new: true,
        });
        if(!document) {
            return next(new BadRequestError(404, "employees not found"));
        }
        return res.send({ message: "employees was updated successfully", });
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Error updating employees with id=${req.params.id}`
            )
        );
    }
};


// Delete a employees with the specified id in the request
exports.delete = async (req, res, next) => {

    const { id } = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };


    try {
        const document = await Employee.findOneAndDelete(condition);
        if(!document) {
            return next(new BadRequestError(404, "employees not found"));
        }
        return res.send({ message: "employees was deleted successfully", });  
    } catch (error) {
        return next(
            new BadRequestError(
                500,`Could not delete employees with id=${req.params.id}`
            )
        );
    }
};

// Delete all employees of a user from the database
exports.deleteAll = async(req, res, next) => {

    try {
        const data = await Employee.deleteMany({});
        return res.send({
            message: `${data.deletedCount} employees was deleted successfully`
        }); 
    } catch (error) {
        return next(
            new BadRequestError(
                500,`An error occurred while removing all employees`
            )
        );
    }
};