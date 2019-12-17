const mongoose = require('mongoose');
var url = "mongodb://localhost/miniverso";
var Product = require('../models/product');

exports.getProductMoreExpensive = (req, res) => {

	mongoose.connect(url, function(err, db) {
		if (err) throw err;	
		db.collection("product").find().sort({price : -1}).limit(1).toArray(function(err, result) {
		  if (err) throw err;
		  if (result){
			res.json(result);
		  }else{
			res.send(JSON.stringify({
                err : 'Error'
            }))
		  }
		  db.close();		 
		});
	  });
}

exports.getFiveProductsMoreCheap = (req, res) => {

	mongoose.connect(url, function(err, db) {
		if (err) throw err;

		db.collection("product").find().sort({price : 1}).limit(5).toArray(function(err, result) {
		  if (err) throw err;
		  if (result){
			res.json(result);
		  }else{
			res.send(JSON.stringify({
                err : 'Error'
            }))
		  }
		  db.close();		 
		});
	  });
}

exports.getQuantityOfProductByType = (req, res) => {
	mongoose.connect(url, function(err, db) {
		db.collection('product').aggregate(
			[
			  {
				$group:
				  {
					_id: {type:  "$type"},				
					count: { $sum: 1 }
				  }
			  }
			]
		 ).toArray(function(err, result) {
			if (err) throw err;
			if (result){
			  res.json(result);
			}else{
			  res.send(JSON.stringify({
				  err : 'Error'
			  }))
			}
			db.close();		 
		  });
	  });
}		

exports.getProductByName = (req, res) => {
	mongoose.connect(url, function(err, db) {
		var title = req.params.title;
		db.collection("product").find({"title":new RegExp(title, 'i') }).toArray(function(err, result) {
			if (err) throw err;
			if (result){
			  res.json(result);
			}else{
			  res.send(JSON.stringify({
				  err : 'Error'
			  }))
			}
			db.close();		 
		});
	});
}


