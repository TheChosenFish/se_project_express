require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { login, createUser } = require("./controllers/users");
const errorHandler = require("./middlewares/error-handler");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

// const routes = require("./routes");

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = {
//     _id: "6749186e162c5ed914a7ac07",
//   };
//   next();
// });

app.use(cors());
app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use("/", indexRouter);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
