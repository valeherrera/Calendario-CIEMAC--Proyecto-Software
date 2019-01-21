'use strict'
var express = require("express");
var controller = require("./imagenes.controller");

var router = express.Router();

router.get("/", controller.getImagenes);
router.put("/", controller.agregarImagen);
router.delete("/:posicionImagen", controller.eliminarImagen);
router.post("/", controller.ModificarImagen);
module.exports = router;