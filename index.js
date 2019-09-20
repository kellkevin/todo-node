var express = require('express');
	app = express(),
	port = 3000,
	bodyParser = require('body-parser');


var todoRoutes = require("./routes/todos");


// Access request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Using the public folder without having to reference it. Explicitly.
app.use(express.static("public"));

// point to the directory
app.use(express.static(__dirname + "/views"));


app.get('/',function(req,res){
	res.sendFile("index.html");
});


app.use("/api/todos",todoRoutes);

/*
app.get('/',function(req,res){
	res.send("HELLO FROM THE ROOT ROUTE");
});
*/
app.get('/',function(req,res){
	res.sendFile("index.html");
});


app.listen(port, function() {
	console.log("APP IS RUNNING ON PORT " 
		+ port);
});