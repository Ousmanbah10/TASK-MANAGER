const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3500;
const task = require("./routes/tasks");
const notfound = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/error-handler");

// get middeware data
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use(cors());
app.use("/api/v1/tasks", task);
app.use(notfound);
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`✅ Server started successfully on port ${port}`);
});
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
