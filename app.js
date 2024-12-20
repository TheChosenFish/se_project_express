const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const {login, createUser} = require("./controllers/users")

const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
  })
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

app.post('/signin', login);
app.post('/signup', createUser);



app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
