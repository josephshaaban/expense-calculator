const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// Load environment variabls from config.env file
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 9000;
const API_VERSION = process.env.API_VERSION || "v1";
const BASE_URL = process.env.BASE_URL || `/api/${API_VERSION}`;

// Middlewares
app.use(express.json()); //parse incoming data
app.use(cors());

// MongoDB Connection
const conn = require("./config/connection");

// Routes

// Error handling

// Listen to server
conn
  .then((db) => {
    if (!db) return process.exit(1);
    else {
      // listen to the http server
      app.listen(PORT, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log(`API server running on port ${PORT}!`);
          console.log(
            `Use expense calculator API at http://localhost:${PORT}${BASE_URL}`,
          );
        }
      });
      app.on("error", (err) =>
        console.log("Failed to Connect with HTTP Server: " + err),
      );
    }
    // error in mongodb connection
  })
  .catch((error) => {
    console.log("Connection failed...!" + error);
  });
