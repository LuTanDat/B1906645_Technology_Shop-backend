const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        orderCode: {
            type: String,
            require: [true, "Order orderCode is required"],
            unique: true,
        },
        discountCode: {
            type: String,
            require: [true, "Order discountCode is required"],
        },


        userName: {
            type: String,
            require: [true, "Order userName is required"],
        },
        userPhone: {
            type: Number,
            require: [true, "Order userPhone is required"],
        },
        userEmail: {
            type: String,
            require: [true, "Order userEmail is required"],
        },
        userAddress: {
            type: String,
            require: [true, "Order userAddress is required"],
        },


        code: {
            type: String,
            require: [true, "Order code of product is required"],
        },
        name: {
            type: String,
            require: [true, "Order name of product is required"],
        },
        // slug: {
        //     type: String,
        //     require: [true, "Order name is required"],
        // },
        quantity: {// so luong
            type: Number,
            require: [true, "Order quantity of product is required"],
        },
        price: {
            type: String,
            require: [true, "Order price of product is required"],
        },
        category: {
            type: String,
            require: [true, "Order category of product is required"],
        },
        images: {
            type: Array,
            require: [true, "Order image is of product required"],
        },
        description: {
            type: String,
            require: [true, "Order description of product is required"],
        },


        quantityProduct: {
            type: Number,
            require: [true, "Order quantityProduct of product is required"],
        },
        totalPriceProduct: {
            type: Number,
            require: [true, "Order totalPriceProduct of product is required"],
        },
        paymentMethods: {
            type: String,
            require: [true, "Order paymentMethods of product is required"],
        },
        isConfirm: {
            type: Boolean,
            require: [true, "Order isConfirm of product is required"],
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

module.exports = mongoose.model("order", schema); // .model: tao collection viet thuong so nhieu có all cac bien cua schema