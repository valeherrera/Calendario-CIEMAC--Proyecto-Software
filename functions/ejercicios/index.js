'use strict'
var express = require("express");
var controller = require("./ejercicios.controller");

var router = express.Router();

router.get("/:codigo/:periodo/:anno/:tema", controller.getEjercicios);
router.post("/", controller.ModificarEjercicio);
router.put("/", controller.agregarEjercicio);
router.delete("/:codigo/:periodo/:anno/:tema/:posicionEjercicio", controller.eliminarEjercicio);


module.exports = router;