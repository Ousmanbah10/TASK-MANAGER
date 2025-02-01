const connectDB = require("./db/connect");
const express = require("express");
const app = express();
require("dotenv").config();
const port = 3500;
const task = require("./routes/tasks");
const notfound = require("./middleware/notfound");
// get middeware data
app.use(express.static("./public"));
app.use(express.json());

// routes
app.use("/api/v1/tasks", task);
app.use(notfound);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, console.log(`Server Started Successfully on ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
