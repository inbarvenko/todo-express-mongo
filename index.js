require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { default: mongoose } = require("mongoose");

const app = express();

const todosModule = require("./components/controller");

app.use(express.json());

app.use(cors())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected MongoDB");
  });

app.use("/todos", todosModule);

app.get('*', (req, res) => {
  res.sendStatus(404);
});


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});
