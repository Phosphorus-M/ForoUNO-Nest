const sharedConfig = require('../jest.config.js');



module.exports = {
  ...sharedConfig,
  "rootDir": ".",
  "testRegex": ".e2e-spec.ts$",
};
