var express = require('express');
var ProductController = require('../controllers/ProductController');

//call the router
var router = express.Router();

router.get('/getProductMoreExpensive',  ProductController.getProductMoreExpensive);

router.get('/getFiveProductsMoreCheap',  ProductController.getFiveProductsMoreCheap);

router.get('/getQuantityOfProductByType',  ProductController.getQuantityOfProductByType);

router.get('/getProductByName/:title',  ProductController.getProductByName);

router.put('/buyProduct/:id/:cant',  ProductController.buyProduct);

module.exports = router;
