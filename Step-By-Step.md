# Introduction: Creating a RESTful service

This step-by-step will guide you through creating HopJS based micro-service from scratch on GitHub and integrating it with 
Travis-CI (A SaaS based Continous Integration build server) and Coveralls a code coverage reporting tool. 

## 1. Create a github account

## 2. Download and install Node.JS on your local laptop

http://nodejs.org/download/

## 3. Open a local command line window

## 4. Create a new project

```shell
mkdir project
cd project
```

## 5. Create a basic node project

```shell
npm init . 
```

This will create an empty node.js project, which 
will result in the creation of a package.json file.

The package.json file describes the project, it
tells npm, the node package manager what your projects
depdendencies are, how to start the application, how to test
it, etc. 

For more details see: https://www.npmjs.org/doc/json.html

## 6. Let's install some dependencies

```shell
npm install hopjs express --save
```

This will install hopjs and the express depdendencies
adding them to your package.json file. 

HopJS is a RESTful framework 
Express.JS is a web framework

By specifying '--save' we're telling npm to save
these depdencies in our package.json

Next we'll install some development depdendencies

```shell
npm install hopjs-remote istanbul coveralls --save-dev
```

These are tools which are required for testing and code
coverage. By specifying '--save-deps' we tell npm 
to save them as part of our development dependencies.

## 7. Let's create a REST-like webservice:

Copy the contents of this service: 

https://github.com/dtyree77/project/blob/master/service.js

And put it into a file in your local project directory called service.js.

This file is the guts of our RESTful service, it defines the service and how to test it. 

## 8. Let's modify the package.json so npm knows how to start the service:

Add "start":"node service.js" to the "scripts" object in the package.json, like so:

```javascript
...
"scripts": {
  "start":"node service.js"
},
...
```

This tells npm the command line required to start your application. 

## 9. Start your server

```shell
npm start
```

## 10. Open a web browser to http://localhost:3000/api/ 

You should now see a documentation page about your new service. From
here you can test your service. 

## 11. Run the tests on your service 

Click 'Run all test cases'

This will cause your browser to make the approproate HTTP requests to
the service to test it. 

## 12. Stop your service

In your command line window you can hit 'ctrl-c'

# Checking your project into Github

## 1. Go to http://github.com/ and login

## 2. In the lower right hand side click the 'New respository' link

## 3. Choose an appropriopriate name for your project, leave all the other settings alone

## 4. Click 'Create Repository'

Take note of the https url in the text box on the next page, this is the https URL for your newly created repository. 

## 5. Create a new local git repo for your project 

In the directory where your application lives:

```shell
git init
```
This creates an empty git repo.

## 6. Connect your local repo to the remote one:

(use the https URL from the git repo you just created)

```shell
git remote add origin https://github.com/[USER]/[PROJECT].git 
``shell

## 7. Add the local files

```shell
git add service.js package.json 
```

## 6. Commit changes

```shell
git commit -m "Initiail checkin"
```

## 7. Push your changes into github

```shell
git push -u origin master
```

# Integrate with Travis-CI (Continous-Integration testing)

## 1. Login to travis.ci

Go to https://travis-ci.org/

Click Sign in with Github

## 2. Authorize travis-ci to access your github account

## 3. Enable travis CI on your project

The project you created in GitHub should show up as a project in Travis-CI for you. 

## 4. Create a .travis.yml file for your project

```yaml
 language: node_js
 node_js: 
  - "0.10"
```

This file tells travis CI what type of project it is, so it knows how to test it. 

## 5. Create a README.md file in your project

In your project edit a file called 'README.md' and put this line in it, changing your username and project
name to be the same as your github username and project name

```
[![Build Status](https://travis-ci.org/[USERNAME]/[PROJECT].png)](https://travis-ci.org/[USERNAME]/[PROJECT])
```

For example:

```
[![Build Status](https://travis-ci.org/dtyree77/project.png)](https://travis-ci.org/dtyree77/project)
```

The README.md is a basic text file which can have formatting similar to a wiki, for more information see:

https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

## 5. Commit your changes

```shell

git add .travis.yml README.md

git commit -m "Added travis badge and conf file"

git push 

```

## 7. Check your test data on travis-ci

Now visit http://travis-ci.org/ (login if necessary) and in a few minutes you should see your first build. 

## 8. Now let's run our tests from the command line:

Create a new file 'test.sh' and put the following information in it:

https://github.com/dtyree77/project/blob/master/test.sh

## 9. Modify the package.json to run your test script

"scripts": {
  "test":"bash test.sh",
  "start":"node service.js"
},

## 10. Test it by hand 

```shell

npm test

``

## 11. Commit your changes

```shell
  git add test.sh package.json
  git commit -m "Added test script"
  git push 
``

You can now check your build status on http://travis-ci.org/ if you desire. 

# Integrating with coveralls.io (Code coverage)

1. Go to http://coveralls.io/

2. Click 'Free sign up'

3. Once directed back to github click 'Authorize'

4. Enable code coverage reporting for your application

5. Click 'View on coveralls'

6. Create a .coveralls.yml file in your repo with the token shown on the coveralls web pagea

For example:

```
  repo_token: eON9bUHcaGRsnX652e2oMurXyA5rG67ax
```

7. Added to your local repo

```shell
git add .coveralls.yml
git commit -m "Added coveralls file"
git push
``` 

8. Check your coveralls page for your project details

9. Add your badge for code coverage to the README.md, save and commit it

(Put your username and project name in the URL's below as appropriate)
```
[![Code Coverage](https://coveralls.io/repos/[USERNAME]/[PROJECT]/badge.png?branch=master)](https://coveralls.io/r/[USERNAME]/[PROJECT])
```

For example:
```
[![Code Coverage](https://coveralls.io/repos/dtyree77/project/badge.png?branch=master)](https://coveralls.io/r/dtyree77/project)
```

Then commit it to git

```shell
git add README.md
git commit -m "Updated readme"
git push
```

10. View your github page to see the new badge

