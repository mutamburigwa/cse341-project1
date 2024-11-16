const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let database;

const initDb = (callback) => {
  if (database) {
    console.log("Db is already initialized!");
    return callback(null, database);
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return callback(new Error("MONGODB_URI is not defined in the environment variables."));
  }

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      database = client.db(); // Extract the database instance
      console.log("Database connection successful!");
      callback(null, database);
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized!");
  }
  return database; // Return the database instance
};

module.exports = {
  initDb,
  getDatabase,
};
