#!/bin/bash

rm -rf coverage

# Start our service with code coverage
./node_modules/.bin/istanbul cover service.js& 

sleep 2 

# Run our unit tests, this works the same way as running them from a browser
./node_modules/.bin/hopjs --url http://localhost:3000/api/ --unitTest

# Tell our service to exit nicely
./node_modules/.bin/hopjs --url http://localhost:3000/api/ TestService.exit


# Submit the code coverage data if we're using coveralls
if [ -f .coveralls.yml ]
then
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js  &
fi

