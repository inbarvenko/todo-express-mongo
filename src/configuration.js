require("dotenv").config();

const defaultConfig = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGO_URL,
  clientUrl: process.env.CLIENT_URL,
};

module.exports = defaultConfig;