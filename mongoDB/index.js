const mongoose = require("mongoose");
require("dotenv").config();
async function connectToMongoBD() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGOBD_NAME}:${process.env.MONGOBD_PASSWORD}@todolist.d3ufr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect successfully!");
  } catch (err) {
    console.log("Connect falure!");
  }
}

module.exports = connectToMongoBD;
