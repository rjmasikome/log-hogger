const util = require('util');
const { checkMongo, insert } = require('./mongo');

const consoleTypes = ["log", "warn", "error", "info"];
const username = require("os").userInfo().username;

module.exports = (config) => {

  const formatArgs = args => [util.format.apply(util.format, Array.prototype.slice.call(args))];

  consoleTypes.forEach((method) => {
    const oldMethod = console[method].bind(console);
    console[method] = function () {

      const payload = {
        type: method,
        user: username,
        file: module.parent.filename || "Not Found",
        fnCaller: arguments.callee && arguments.callee.caller.name || arguments.callee.caller.toString() || "Not found",
        arguments: config.concat ? formatArgs(arguments)[0] : arguments
      }

      insert(config, payload, (err, res) => {

        if (err)
          oldMethod.apply(console, err);

        oldMethod.apply(console,formatArgs(arguments));

      });
    }
  });

};
