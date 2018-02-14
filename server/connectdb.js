const mongoose = require('mongoose');
//var uri = 'mongodb://username:password@hostname:port/databasename';
const url = 'mongodb://localhost:27017/test';
mongoose.connection.once('open', function() {
  console.log('open======');
  // logger.info('MongoDB event open');
  // logger.debug('MongoDB connected [%s]', url);

  mongoose.connection.on('connected', function() {
    console.log('connected======');
    // logger.info('MongoDB event connected');
  });

  mongoose.connection.on('disconnected', function() {
    console.log('disconnected======');
    // logger.warn('MongoDB event disconnected');
  });

  mongoose.connection.on('reconnected', function() {
    console.log('reconnected======');
    // logger.info('MongoDB event reconnected');
  });

  mongoose.connection.on('error', function(err) {
    // logger.error('MongoDB event error: ' + err);
    console.log('err====',err);
  });

  // return resolve();
  // return server.start();
});

return mongoose.connect(url, {}, function(err) {
  if (err) {
    console.log('err-----',err);
    // logger.error('MongoDB connection error: ' + err);
    // return reject(err);
    process.exit(1);
  }
});