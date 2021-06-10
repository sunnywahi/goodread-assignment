# goodread-assignment

Project reads a huge data set of good-reads, which is present in backend/data folder.

* backend module- exposes python-rest-api backend made using flask and exposes the end point at ```http://localhost:8090/```, which all is controlled in ```.flaskenv```
    * This can also be run running flask_run.py ```main``` method by Intellj or any studio.
    * Also make sure you have flask package installed

* ui module- exposes the react endpoint at ```http://localhost:8080/``` if you want to change the port than you can in webpack.config.js change PORT


## Commands

* To resolve dependencies: ``` npm install```
* To compile javascript: ``` npm run dev```
* To run ui in development: ```npm start```
* To run backend in development ```flask run```


## History
### Install webpack & CLI tools
``` 
npm init -y
npm install webpack webpack-cli webpack-dev-server --save-dev
```


### Install HTML webpack plugin
A web application without an HTML page is almost useless. To work with HTML in webpack we need to install a plugin, html-webpack-plugin:
``` 
npm i html-webpack-plugin --save-dev
```
The ultimate goal of html-webpack-plugin is twofold:

* it loads our HTML files
* it injects the bundle(s) in the same file


### Install CSS Loader plugin
To work with CSS in webpack we need to install at least two loaders.
Before testing the page we need to install the loaders:

* __css-loader__ for loading CSS files with import
* __style-loader__ for loading the stylesheet in the DOM
``` 
npm i css-loader style-loader --save-dev
```

### Install Babel plugin

webpack doesn't know on its own how to transform JavaScript code. This task is outsourced to a third-party loader, specifically babel-loader, with babel.

babel is a JavaScript compiler and "transpiler". Given modern JavaScript syntax as input, babel is able to transform it to compatible code that can run in (almost) any browser.

Before moving forward we need to install a bunch of packages:
* __babel core__, the actual engine
* __babel preset env__ for compiling modern Javascript down to ES5
* __babel loader__ for webpack

``` 
npm i @babel/core babel-loader @babel/preset-env --save-dev
```


### Installing Babel for React

``` 
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```


### Installing React Bootstrap

``` 
npm install react-bootstrap bootstrap
```

### Installing React Router

``` 
npm install react-router-dom
npm install react-router-bootstrap
```

## Resources

* https://flask.palletsprojects.com/en/2.0.x/
* https://material-table.com/#/
