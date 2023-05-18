const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        code: {
            type: String,
            require: [true, "Employee code is required"],
            unique: true,
        },
        name: {
            type: String,
            require: [true, "Employee name is required"],
        },
        pw: {
            type: String,
            require: [true, "Employee pw is required"],
        },
        email: {
            type: String,
            require: [true, "Employee email is required"],
        },
        address: {
            type: String,
            require: [true, "Employee address is required"],
        },
        dateOfBirth: {
            type: String,
            require: [true, "Employee dateOfBirth is required"],
        },
        sex: {
            type: String,
            require: [true, "Employee sex is required"],
        },
        phone: {
            type: Number,
            require: [true, "Employee phone is required"],
        },
        position: {
            type: String,
            require: [true, "Employee position is required"],
        },
        // slug: {
        //     type: String,
        //     require: [true, "Product name is required"],
        // },
        images: {
            type: Array,
            require: [true, "Product image is required"],
        },
    },
    { timestamp: true,}
);

// Replace _id with id and remove __V
schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("customer", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema