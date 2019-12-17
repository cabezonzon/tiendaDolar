var Product = require('../models/product');

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