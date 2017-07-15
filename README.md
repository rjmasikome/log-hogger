# log-hogger

Module to have a persistent console methods. Now there are no more untracked `console.error` or `console.warn`.

## Pre-requisite and requirement
* Make sure `mongodb` is installed
* No access control to your mongo (Can be accessed without password)
* Update node to version 7

## Installation and Usage

### Quickstart
* Install the module in your project directory
```
npm install log-hogger
```
* Initialize by calling the module as function, and call your favorite console method (Don't forget to run your node script)
```js
const hogger = require("log-hogger");
hogger();
console.log("Hello World!");
```
* Check your MongoDB collection, and it should appear in `log-hogger` database in collection named `logs`

### Settings
You can initialize this module with more options, below is the default options and example how to initialize it.
```js
const hogger = require("log-hogger");
const options = {
  mongoUrl: "mongodb://localhost:27017/",
  db: "log-hogger",
  collection: "logs",
  concat: true,
  methods: ["log", "warn", "error", "info"]
};
hogger(options);
```

If the example is not self explanatory, here is some more details explanation on the options that you can select.
* `mongoUrl`: URL of the mongo server, on example is the default localhost which is `mongodb://localhost:27017/`
* `db`: database of mongo of your choice, default is `log-hogger`
* `collection`: name of collection that you want to store the data, default is
* `concat`: Whether you want to concat the arguments, default is `true`
* `methods`: array of console methods that you want to use this module with, default is
`["log", "warn", "error", "info"]`

## More description and Schema
Utilizing MongoDB as the storage. The schema of a saved console methods are maintly stored in string and will look as the following.
```js
{
    "_id" : ObjectId("5968d6fa1450877e77347e1f"),
    "type" : "log",
    "user" : "rjmasikome",
    "file" : "/home/rjmasikome/projects/test/index.js",
    "line" : "8",
    "caller" : "    at Object.<anonymous> (/home/rjmasikome/projects/test/index.js:8:9)",
    "arguments" : "Hello World!",
    "time" : ISODate("2017-07-14T14:36:42.685Z")
}
```

* `_id` : unique id of mongodb
* `type` : type of console methods, such as log, info, warn or error
* `user` : user that is logged in to the system which runs the node script
* `file` : the file where this console method is called
* `line` : line number where this console is called  
* `caller` : line of stacktrace where this method is called
* `arguments`: arguments or parameter of console method
* `time`: the timestamp this method is called, stored as `Date` object
