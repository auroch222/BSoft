function App(){
	this.fs = require('fs'); //File System
	this.path = require('path'); //For handling and transforming file paths.
	this.http = require('http').createServer(handler); //HTTP server 'handler' function that runs 
	this.io = require('socket.io'); //Websockets/socket.io 
	this.mongo = require('mongodb').MongoClient; //MongoDB client
	this.configs = JSON.parse("./configs/config.json");
}

var app = new App();