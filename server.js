const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// connect
const connectToMongoBD = require("./mongoDB/index");
connectToMongoBD();
// route

const route = require("./routes/index");
route(app);

// listen server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
