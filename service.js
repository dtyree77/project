// Require / load some of the packages we need for this RESTFul service
var express = require('express');
var Hop = require('hopjs');

//Create a new web app
var app = express();

//configure our new web app
app.configure(function(){
  //Set the port and load various handlers
  app.set('port', process.env.PORT || 3000);
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(app.router);
});

//Define our REST-like service, which provides a reset-able counter
CounterService={}

CounterService.count=0;

//Define an increment function for our service
CounterService.increment=function(input,onComplete){
  CounterService.count++;
  return onComplete(null,{ count: CounterService.count });
}

//Define a reset function for our service
CounterService.reset=function(input,onComplete){
  CounterService.count=0;
  return onComplete(null,true);
}

//Provide the interface definition to the REST framework
Hop.defineClass("CounterService",CounterService,function(api){
  api.post("increment","/increment");
  api.post("reset","/reset");
});

//Describe how to do a basic test of our service, increment a value twice and make sure we get the expected result
Hop.defineTestCase("CounterService.increment",function(test){
  test.do("CounterService.reset").noError();
  test.do("CounterService.increment").outputContains({ count:1 });
  test.do("CounterService.increment").outputContains({ count:2 });
});

//Hang our restful service off of the /api/ path
Hop.apiHook("/api/",app);

//Start our webservice
app.listen(3000);
