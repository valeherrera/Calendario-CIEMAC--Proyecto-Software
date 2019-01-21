'use strict'
var express = require("express");
var controller = require("./cuenta.controller");

var router = express.Router();

    router.get("/:correo", controller.comprobacionCuenta);

module.exports = router;