require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_SRV = process.env.MONGODB_SRV;

module.exports = {
  MONGODB_SRV,
  PORT,
};
