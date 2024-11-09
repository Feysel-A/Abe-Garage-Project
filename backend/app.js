//import express from 'express';
const express = require('express');
//Import dotenv module and call the config method
require('dotenv').config();
const app = express();
//Initialize cors and call the use method
const cors = require('cors');
app.use(cors());
//Initialize express.json and call the use method
app.use(express.json());
//Import router
const router = require('./routes');
//Use the router    
app.use(router);
//Import db config
const dbConfig = require('./config/db.config');
//Set the port
const port = process.env.PORT;
//Start the server using the listen method
app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})



























































