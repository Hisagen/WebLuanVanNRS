import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from "./route/web";
import connectDB from "./config/connectDB";
const fileUpload = require("express-fileupload");
import session from "express-session";
const compression = require("compression");
// import cors from 'cors';
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
var Sequelize = require("sequelize");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
import multer from "multer";

const sequelize = new Sequelize("lancuoi", "sa", "123456", {
  host: "localhost",
  dialect: "mssql",
  logging: false,
});
require("dotenv").config();

let app = express();

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { amount, id } = req.body;
  console.log("req.body.amount", req.body.amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Spatula company",
      payment_method: id,
      confirm: true,
    });

    console.log("res", res);

    res.json({
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.use(fileUpload());

viewEngine(app);
initWebRouters(app);

connectDB();

let port = process.env.PORT || 1234;

app.listen(port, () => {
  console.log("Backend Nodejs is running on the port: " + port);
});
