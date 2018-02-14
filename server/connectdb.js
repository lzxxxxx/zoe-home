const mongoose = require('mongoose');
//var uri = 'mongodb://username:password@hostname:port/databasename';
const url = 'mongodb://localhost:27017/test';
mongoose.connection.once('open', function() {
  console.log('open======!!');

  mongoose.connection.on('connected', function() {
    console.log('connected======');
  });

  mongoose.connection.on('disconnected', function() {
    console.log('disconnected======');
  });

  mongoose.connection.on('reconnected', function() {
    console.log('reconnected======');
  });

  mongoose.connection.on('error', function(err) {
    console.log('err====',err);
  });

  // return resolve();
  // return server.start();
});

return mongoose.connect(url, {}, function(err) {
  if (err) {
    console.log('connect err-----',err);
    // logger.error('MongoDB connection error: ' + err);
    // return reject(err);
    process.exit(1);
  }
});