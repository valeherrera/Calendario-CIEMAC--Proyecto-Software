'use strict'
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var admin = require("firebase-admin");
var serviceAccount = require('./firebase-config.json');

var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://calendariomatematico-e29a5.firebaseio.com"
});

require("./routers")(app);

app.listen(3000/*process.env.PORT*/, () => {
  console.log('El servidor corre en el puerto: 3000');
})