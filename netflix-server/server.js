const express = require("express");
const cors = require("cors"); // Fix typo here
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRouters");

const app = express();

app.use(cors()); // Fix typo here
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/netflix", {
    useNewUrlParser: true, // Fix typo here
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server started on port 5173"));
