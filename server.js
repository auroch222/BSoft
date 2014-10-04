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
	};
	//populate cache
	this.populateCache = function(){
		if(typeof this.zCache === "undefined"){ //if zCache s undefined
			this.zCache = { 'index.html': '' };
		}
		this.zCache['index.html'] = fs.readFileSync('./public/index.html');
		console.log("Dat Html! Yummy :D");
	};
	//*****************************************************************

	/******************************************************************
	*Retrieve Entry Content For Cache
	*******************************************************************/

	this.getCache = function(key){
		return this.zCache[key];
	};

	/*
		*Terminator - THe termination handler.
		*Terminate server on receipt of the specified signal.
		*@param {string} signal  Signal to terminate on.
	*/
	this.terminator = function(signal){
		if(typeof signal ==== "string"){
			console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), signal);
		}
		console.log('%s: Node server stopped.', Date(Date.now()) );
		//indicate that node server is stopped!
		process.exit(1);
	};

	/*****************************************************************
     *  Setup termination handlers (for exit and a list of signals).
     *****************************************************************/

    this.setupTerminationHandlers = function(){
     	//  Process on exit and signals.
     	process.on('exit', function(){ 
     		this.terminator(); 
     	});
     	//bugz
     	['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { this.terminator(element); });
        });
    };
    //termination process is done!

    /*********************************************************************
    *************************Main Server Logic****************************
    *********************************************************************/

    /*
    	*Routing entries
    */
    this.createRoutes = function(){
    	this.routes = {};
    	//routes handler for main folder
    	this.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(this.getCache('index.html') );
        };
    };

    /* 
    	*Initialize Serv
    */
    this.initializeServer = function(){
    	//get routes
    	this.createRoutes();
    	//create express server
    	this.serv = this.express.createServer();
    	//add handlers for routes
    	for (var r in this.routes) {
            this.serv.get(r, self.routes[r]);
        }
    };

    /*
    	*Initialize the application
    */

    this.initialize = function(){
    	//Setup Main Vars
    	this.setupVariables();
    	//Populate Cache
    	this.populateCache();
    	//Setup Termination Handlers
    	self.setupTerminationHandlers();

    	//create express server and routes
    	this.initializeServer();
    };

    /*
    	*Start The Server!
    */

    this.start = function(){
    	//Start the app on the port and ip
    	this.serv.listen(this.port,this.ipAddress,function(){
    		console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), this.ipaddress, this.port);
    	});
    }
}

/*************************************************************************/
/***************************App Config is done****************************/
/*************************************************************************/


//Create new app using of App class
var app = new App();
app.initialize();
app.start();

