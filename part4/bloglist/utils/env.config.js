require('dotenv').config();

let PORT = process.env.PORT;
let MONGODB_SRV = process.env.MONGODB_SRV;
let SECRET = process.env.SECRET;

module.exports = {
  MONGODB_SRV,
  PORT,
  SECRET,
};
