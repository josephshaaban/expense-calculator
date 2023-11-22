const mongoose = require("mongoose");

const ATLAS_PASS = process.env.ATLAS_PASS;
const connectionString =
  process.env.ATLAS_URI ||
  `mongodb+srv://josephsha3ban:${ATLAS_PASS}@cluster0.7qwnixv.mongodb.net/?retryWrites=true&w=majority`;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expensetracker";

const conn = mongoose
  .connect(MONGODB_URI)
  .then((db) => {
    console.log("Databse Connected");
    return db;
  })
  .catch((err) => {
    console.log("Connection Error: " + err);
  });

module.exports = conn;
