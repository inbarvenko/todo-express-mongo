const PORT = 27017;

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

const todosModule = require("./components/controller");

app.use(express.json());

const uri = `mongodb://localhost: ${PORT}`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected MongoDB");
  });

app.use("/todos", todosModule);

app.get('*', function(req, res){
  res.sendStatus(404)
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
