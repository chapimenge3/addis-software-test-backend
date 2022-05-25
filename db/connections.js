const mongoose = require('mongoose');

const connectionString = process.env.MONGO_STRING

// connect the database
mongoose.connect(connectionString, { useNewUrlParser: true });

console.log('Connected to database successfully');

module.exports = mongoose