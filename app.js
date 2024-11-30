const mongoose = require("mongoose");
const express = require("express");
const indexRouter = require("./routes/index.js");
const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const routes = require("./routes");
app.use(express.json());
app.use(routes);

app.use(express.json());
app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
