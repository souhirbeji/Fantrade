const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 8060;

app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/fanTrade", {})
  .then(() => {
    console.log("Connected to the mongoDB database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const routes = require("./routes/routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
