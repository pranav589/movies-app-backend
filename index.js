const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", require("./routes/users"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));
app.use("/api/comment", require("./routes/comment"));

const db = process.env.MONGO_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port`, PORT);
});
