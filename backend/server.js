const express = require("express");
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');



const app = express();


// Database connectivity
const url = 'mongodb+srv://tushars:nJJwSIKp2FVFZO6e@textutilavinash.phk5cil.mongodb.net/';
const dbName = 'Textutils';
const client = new MongoClient(url);


const PORT = 7000;

//Send data in the form of json Body (raw)
app.use(bodyParser.json());


app.post('/savedetails', function(req, res){
	
	const jsonbody = req.body;
	
	console.log(jsonbody);
	
	client.connect();
	console.log('Connected successfully to server');
	const collection = client.db(dbName).collection('Empmaster');

	collection.insertOne(jsonbody);
	
	///  Fetch all Document 
	const arr = collection.find({}).toArray();
		
	arr.then(function(result){	
			res.status(200).json({"msg":"Data inserted Successfully", "status":200, "data": result});
	});
});


app.get("/editinfo/:eid", function(req,res){
		
	let emailid = req.params.eid;
	
	console.log(emailid);

	
	client.connect();
	console.log('Connected successfully to server');
	const collection = client.db(dbName).collection('Empmaster');
	
	const arr = collection.find({'emailid':emailid}).toArray();
	
	arr.then(function(result){	
			res.status(200).json({"msg":"Data Fetched Successfully", "status":200, "data": result});
	});
})

app.post('/fetchdetails', function(req, res){
		
	client.connect();
	console.log('Connected successfully to server');
	const collection = client.db(dbName).collection('Empmaster');

	//collection.insertOne(jsonbody);
	
	///  Fetch all Document 
	const arr = collection.find({}).toArray();
		
	arr.then(function(result){	
			res.status(200).json({"msg":"Data Fetch Successfully", "status":200, "data": result});
	});
});



app.post('/login', function(req, res) {
	
	client.connect();
	console.log('Connected successfully to server');
	const collection = client.db(dbName).collection('Empmaster');
	
	const jsonbody = req.body;
	
	console.log(jsonbody);
	
	res.status(200).json({"msg":"login successfully", "status":200, "data": jsonbody});
	
	
	

})



app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

