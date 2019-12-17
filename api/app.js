//express module
var express = require('express');
const morgan = require('morgan');

var app = express();

//import routes
var s3_routes = require('./routes/S3Router.js'); 
var product_routes = require('./routes/ProductRouter.js'); 


//middlewares
app.use(morgan('dev'));

app.use('/api', s3_routes);
app.use('/product', product_routes);


module.exports = app;