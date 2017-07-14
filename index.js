const main = require("./lib/main");

module.exports = (config = {}) => {

  const dbConfig = {
    mongoUrl: config.mongoUrl || "mongodb://localhost:27017/",
    db: config.db || config.database || "log-hogger",
    collection: config.collection || "logs",
    concat: config.concat || true
  };

  main(dbConfig);

  console.log("Broh");
}
