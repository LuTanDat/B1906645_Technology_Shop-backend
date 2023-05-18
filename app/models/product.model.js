const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        code: {
            type: String,
            require: [true, "Product code is required"],
            unique: true,
        },
        name: {
            type: String,
            require: [true, "Product name is required"],
        },
        // slug: {
        //     type: String,
        //     require: [true, "Product name is required"],
        // },
        quantity: {// so luong
            type: Number,
            require: [true, "Product quantity is required"],
        },
        price: {
            type: String,
            require: [true, "Product price is required"],
        },
        category: {
            type: String,
            require: [true, "Product category is required"],
        },
        images: {
            type: Array,
            require: [true, "Product image is required"],
        },
        description: {
            type: String,
            require: [true, "Product description is required"],
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

module.exports = mongoose.model("product", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema