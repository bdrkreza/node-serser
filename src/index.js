const express = require("express");
const cors = require("cors");

const { userRoute, orderRoute, productRoute } = require("./routes");
const { notFoutRoute, errorHandler } = require("./utils/errorHandler");
const connectMongoDB = require("./mongodb");

require("dotenv").config();
const app = express();

// all middleware array
const middleware = [
  //body-parser connect
  express.json({ limit: "30mb", extended: true }),
  express.urlencoded({ limit: "30mb", extended: true }),
  //cors connect
  cors()
];

// all middleware
app.use(middleware);

//server connect
connectMongoDB();

app.get("/", function (req, res) {
  res.send("hello world bangladesh");
});

// // application routes
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/product", productRoute);

// default error handler
app.use(errorHandler);
app.use(notFoutRoute);
//server port connect
const PORT = process.env.PORT || 5000;
app.listen(PORT);
