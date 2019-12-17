const s3 = require('../config/config.js');
const mongoose = require('mongoose');
var url = "mongodb://localhost/miniverso";

//this method downloads the json from the aws bucket and 
//creates the collection in mongo with the name 'product'
exports.doDownload = (req, res) => {
	const s3Client = s3.s3Client;
	const params = s3.downloadParams;
	
	params.Key = req.params.filename;

	const s3ClientResponse = s3Client.getObject(params)
		.createReadStream()
			.on('error', function(err){
				res.status(500).json({error:"Error -> " + err});				
		});

	var jsonStr = "";
	s3ClientResponse.on('data', function (products) {
		jsonStr = products; 		
	});
	s3ClientResponse.on('end', function() {	
		var myObject = JSON.parse(jsonStr);	
		mongoose.connect(url, async function(err,db) {
		await db.collection('products').remove();
		await db.collection('products').insertMany(myObject.products, function(err, records) {
			if (err) throw err;
            console.log("record added");
            res.status(200).json({messagge:"database downloaded and saved"});				
          });
          db.close();
		});
	});
}