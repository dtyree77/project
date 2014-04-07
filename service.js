var express = require('express');
var Hop = require('hopjs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(app.router);
});

CounterService={}

CounterService.count=0;

CounterService.increment=function(input,onComplete){
  CounterService.count++;
  return onComplete(null,{ count: CounterService.count });
}

CounterService.reset=function(input,onComplete){
  CounterService.count=0;
  return onComplete(null,true);
}

Hop.defineClass("CounterService",CounterService,function(api){
  api.post("increment","/increment");
  api.post("reset","/reset");
});

Hop.defineTestCase("CounterService.increment",function(test){
  test.do("CounterService.reset").noError();
  test.do("CounterService.increment").outputContains({ count:1 });
  test.do("CounterService.increment").outputContains({ count:2 });
});

Hop.apiHook("/api/",app);

app.listen(3000);
