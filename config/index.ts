let configs = {};

if (process.env.NODE_ENV === 'production') {
  configs = require('./prod');
} else {
  configs = require('./dev');
}

export = configs;
