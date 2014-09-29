function App(){
	this.fs = require('fs'); //File System
	this.path = require('path'); //For handling and transforming file paths.
	this.http = require('http').createServer(handle); //HTTP server 'handler' function that runs 
	this.io = require('socket.io'); //Websockets/socket.io 
	this.mongo = require('mongodb').MongoClient; //MongoDB client
}

//create new app using of App class
var app = new App();


/*listen to the port and host where those two are environment variables*/
app.http.listen(OPENSHIFT_NODEJS_PORT,OPENSHIFT_NODEJS_IP);


//handle page requests with response(s:1 at this time :D)
function handle(req,res){
	if(req.url == '/home'){
		app.fs.readFile('./public/index.html',function(error,data){
				if(error){
					res.writeHead(404,{'Content-Type':'text/html'});
					res.end('Sorry not Found!');
				}else{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end(data);
				}

		});
	}
}




