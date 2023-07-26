const mongoose = require("mongoose");
require("dotenv").config()


const connectionPromise = mongoose.connect(process.env.MongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { connectionPromise };
