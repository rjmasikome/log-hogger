const main = require("./lib/main");

module.exports = (config = {}) => {

  const dbConfig = {
    mongoUrl: config.mongoUrl || "mongodb://localhost:27017/",
    db: config.db || config.database || "log-hogger",
    collection: config.collection || "logs",
    methods: config.methods || ["log", "warn", "error", "info"],
    concat: config.concat === false ? false : true,
  };

  main(dbConfig);
}
