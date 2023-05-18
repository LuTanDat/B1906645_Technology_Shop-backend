const express  = require('express');
const products = require("../controllers/product.controller");
const employees = require("../controllers/employee.controller");
const customers = require("../controllers/customer.controller");
const orders = require("../controllers/order.controller");

module.exports = (app) => {
    const router = express.Router();

    router.route("/")// Product
        .get(products.findAll)
        .post(products.create)
        .delete(products.deleteAll);

    router.route("/employee/")
        .get(employees.findAll)
        .post(employees.create)
        .delete(employees.deleteAll);
    
    router.route("/customer/")
        .get(customers.findAll)
        .post(customers.create)
        .delete(customers.deleteAll);
    
    router.route("/order/")
        .get(orders.findAll)
        .post(orders.create)


    router.route("/:id")
        .get(products.findOne)
        .put(products.update)
        .delete(products.delete);
    
    router.route("/employee/:id")
        .get(employees.findOne)
        .put(employees.update)
        .delete(employees.delete);

    router.route("/customer/:id")
        .get(customers.findOne)
        .put(customers.update)
        .delete(customers.delete);

    router.route("/order/:id")
        .put(orders.update)
        

    app.use("/api/shops", router);
}