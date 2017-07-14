const util = require('util');
const { checkMongo, insert } = require('./mongo');

const consoleTypes = ["log", "warn", "error", "info"];
const username = require("os").userInfo().username;

module.exports = (config) => {

  const formatArgs = args => [util.format.apply(util.format, Array.prototype.slice.call(args))];

  consoleTypes.forEach((method) => {
    const oldMethod = console[method].bind(console);
    console[method] = function () {

      const firstStack = new Error().stack.split('\n')[2];
      const lineNumber = firstStack.split(':')[1];
      const path = firstStack.split(':')[0].split('(').length > 2 ? firstStack.split(':')[0].split('(')[2] : firstStack.split(':')[0].split('(')[1];

      const payload = {
        type: method,
        user: username,
        file: path || "Not Found",
        line: lineNumber || "Not Found",
        caller: firstStack,
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
