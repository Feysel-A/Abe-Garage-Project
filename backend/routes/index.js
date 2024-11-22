//Import the express module
const express = require('express');
//Initialize express
const router = express.Router();
//Import the install router
const installRouter = require('./install.routes');
//Import the employee routes
const employeeRouter = require("./employee.routes")
//Import the login routes
const loginRouter = require("./login.routes")
//Import the customer routes
const customerRouter = require("./customer.routes")
// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRouter);
//Add the customer routes to the main router
router.use(customerRouter)
//Export the router
module.exports = router;