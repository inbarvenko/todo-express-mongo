const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const connectDB = require("./db/connectDB");
const config = require("./configuration");

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
  })
);

app.use(express.json());

app.use("/todos", routes);

app.use("*", (_req, res) => {
  res.sendStatus(404);
});

(async () => {
  try {
    await connectDB(config.dbUri);

    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}!`);
    });
  } catch (err) {
    console.error("Server start failed with: ", err);
    process.exit(1);
  }
})();