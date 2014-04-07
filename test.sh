#!/bin/bash

# Start our service with code coverage
./node_modules/.bin/istanbul cover service.js& 

NODE_PID=$!

sleep 1 

# Run our unit tests, this works the same way as running them from a browser
./node_modules/.bin/hopjs --url http://localhost:3000/api/ --unitTest

if [ -x .coveralls.yml ]
then
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js 
  rm -rf ./coverage
fi

kill $NODE_PID
