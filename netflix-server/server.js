const express = require("express");
const cors = require("cors"); // Fix typo here
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRouters");

const app = express();

app.use(cors()); // Fix typo here
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://subhashree_01:8jS287Y7sp4gzyhc@cluster0.jor9hn3.mongodb.net/netflix",
    {
      useNewUrlParser: true, // Fix typo here
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.use("/api/user", userRoutes);

app.listen(5000, console.log("Server started on port 5000"));

// mongodb+srv://ssubhashree094:<D29TZ3NTmh6cX08e>@cluster0.nuaqyiu.mongodb.net/
