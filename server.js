const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const app = require("./app");

// * Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.error(`${err.name}. Server is shutting down.`);
  console.error(err.message);
});

// * Configuration
dotenv.config({ path: "./config.env" });

// * MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Connecting to the database is successful.");
  } catch (e) {
    console.error(`Connecting to the database is failed. ${e}`);
  }
})();

// * Creating the server
const server = http.createServer(app);

// * Listening to the server
server.listen(process.env.PORT, () =>
  console.log(`Server is running on PORT: ${process.env.PORT}`)
);

// * Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.error(`${err.name} Server is shutting down.`);
  console.error(err.message);
  server.close(() => process.exit(1));
});
