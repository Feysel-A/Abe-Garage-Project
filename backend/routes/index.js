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
//Import the vehicle routes
const vehicleRouter = require("./vehicle.routes")
//Import the service routes
const serviceRouter = require("./service.routes")
// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router 
router.use(employeeRouter);
// Add the login routes to the main router
router.use(loginRouter);
//Add the customer routes to the main router
router.use(customerRouter)
//Add the vehicle routes to the main router
router.use(vehicleRouter)
//Add the service routes to the main router
router.use(serviceRouter)
//Export the router
module.exports = router;