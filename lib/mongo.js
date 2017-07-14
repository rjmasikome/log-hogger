"use strict";

const MongoClient = require('mongodb').MongoClient;

const insert = (config, payload, cb) => {

  const mongoUrl = config.mongoUrl;
  const dbName = config.db;
  const collectionName = config.collection;

  MongoClient.connect(mongoUrl + dbName, (err, db) => {

    const collection = db.collection(collectionName);
    const obj = Object.assign(payload, {time: new Date()})

    if (err)
      return cb(`Unable to connect to the mongoDB server. Error: ${err}`, null);

    collection.insert(obj, function(err, doc) {

      if (err)
        return cb(`Error accessing database: ${err}`, null);

      cb(null, doc);
      db.close();
    });

  });
}

const checkMongo = (config, cb) => {

  const mongoUrl = config.mongoUrl;
  const dbName = config.db;
  const collectionName = config.collection;

  MongoClient.connect(mongoUrl + dbName, (err, db) => {

    if (err)
      return cb(`Unable to connect to the mongoDB server. Error: ${err}`, null);
    db.close();

    cb(null, "success");

  });
}

module.exports = {
  insert,
  checkMongo
}
