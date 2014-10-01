#!/bin/env node
//and the fun begins here :3

var App =  function(){
	this.fs = require('fs'); //File System
	this.path = require('path'); //For handling and transforming file paths.
	this.http = require('http').createServer(handle); //HTTP server 'handler' function that runs 
	this.io = require('socket.io'); //Websockets/socket.io 
	this.mongo = require('mongodb').MongoClient; //MongoDB client
	this.express = require('express'); //require express :p I kinda dislike it but openshift pleases me to do it I think! :(
	/*********************************************************************
	***************************Help Functions!****************************
	*********************************************************************/

	//setup Ip and Port env vars
	this.setupVariables = function(){
		this.ipAddress = process.env.OPENSHIFT_NODEJS_IP; //IP ADDRESS
		this.port = process.env.OPENSHIFT_NODEJS_PORT || 8080; //PORT internal or 8080

		//If the IP is not available then set it to local '127.0.0.1'
		if(typeof this.ipAddress === "undefined"){
			//
			console.warn("No OPENSHIFT_NODEJS_IP var, using 127.0.0.1");
			this.ipAddress = "127.0.0.1";
		}
	}
	//populate cache
	this.populateCache = function(){
		if(typeof this.zCache === "undefined"){ //if zCache s undefined
			self.zcache = { 'index.html': '' };
		}
	}
}

//create new app using of App class
var app = new App();


/*listen to the port and host where those two are environment variables*/
app.http.listen(process.env.OPENSHIFT_IP,
	process.env.OPENSHIFT_PORT || 8080);


//handle page requests with response(s:1 at this time :D)
function handle(req,res){
	if(req.url == '/'){
		app.fs.readFile('./public/index.html',function(error,data){
				if(error){
					res.writeHead(404,{'Content-Type':'text/html'});
					res.end('Content You Requested Is Not Available, Sorry! :(');
				}else{
					res.writeHead(200,{'Content-Type':'text/html'});
					res.end(data);
				}

		});
	}
}




