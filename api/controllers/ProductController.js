var Product = require('../models/product');
const mongoose = require('mongoose');

exports.getProductMoreExpensive = (req, res) => {
		const query = Product.find();
		query.collection(Product.collection);
		query.sort({price : -1});
		query.limit(1).exec(function(err, result) {
			if (err) throw err;
			if (result){
			  res.json(result);
			}else{
			  res.send(JSON.stringify({
				  err : 'Error'
			  }))
			}
		});
}

exports.getFiveProductsMoreCheap = (req, res) => {
	const query = Product.find();
	query.collection(Product.collection);
	query.sort({price : 1});
	query.limit(5).exec(function(err, result) {
		if (err) throw err;
			if (result){
			  res.json(result);
			}else{
			  res.send(JSON.stringify({
				  err : 'Error'
			  }))
			}
		});
}

exports.getQuantityOfProductByType = (req, res) => {
	Product.aggregate(
			[
			  {
				$group:
				  {
					_id: {type:  "$type"},				
					quantity: { $sum: 1 }
				  }
			  }
			]
		 ).exec(function(err, result) {
			if (err) throw err;
			if (result){
			  res.json(result);
			}else{
			  res.send(JSON.stringify({
				  err : 'Error'
			  }))
			}		 
	  });
}		

exports.getProductByName = (req, res) => {
	var title = req.params.title;
	const query = Product.find({"title":new RegExp(title, 'i') });
	query.exec(function(err, result) {
		if (err) throw err;
		if (result){
		  res.json(result);
		}else{
		  res.send(JSON.stringify({
			  err : 'Error'
		  }))
		}		
	});	
}

exports.buyProduct = (req, res) => {
	const id = req.params.id;
	const cant = req.params.cant;	
	var stock = 0;
	Product.findById(id)	
	.exec((err, product) => {
	  if (err) {
		console.error(err);
	  } else {
			if (!product) {
		  		res.status(500).send('Not found!');
			}else{
			  stock = product.stock - cant;
			  if (stock < 0){
				res.status(400).send('No stock available');
			  }else {
			  Product.where({_id : product.id}).update({ stock : stock}).exec((err, product) => {
				if (err) {
				  console.error(err);
				} else {
					res.status(200).send('Buy done!');
				}					
			  });
			}
		  }		
	  }
	});
}

