'use strict'
var express = require("express");
var controller = require("./temas.controller");

var router = express.Router();



router.get("/:codigo/:periodo/:anno", controller.getTemas);
router.delete("/:codigo/:periodo/:anno/:tema", controller.EliminarTemas);
router.post("/", controller.ModificarTema);
router.put("/", controller.AgregarTemas);


module.exports = router;