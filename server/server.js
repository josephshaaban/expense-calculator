const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const usersRoute = require("./routes/usersRoute");
const passwordReset = require("./routes/passwordReset");
const accountsRoute = require("./routes/accountsRoute");
const transactionsRoute = require("./routes/transactionsRoute");

const globalErrorHandler = require("./handlers/globalErrorHandler");

// Load environment variabls from config.env file
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 9000;
const API_VERSION = process.env.API_VERSION || "v1";
const API_URI = process.env.API_URI || `/api/${API_VERSION}`;

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB Connection
const conn = require("./config/connection");

// Routes
app.use(`${API_URI}/users`, usersRoute);
app.use(`${API_URI}/password-reset`, passwordReset);
app.use(`${API_URI}/accounts`, accountsRoute);
app.use(`${API_URI}/transactions`, transactionsRoute);

// Error handling
app.use(globalErrorHandler);

// Connect to MongoDB and then listen to server
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
            `Use expense calculator API at http://localhost:${PORT}${API_URI}`,
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
