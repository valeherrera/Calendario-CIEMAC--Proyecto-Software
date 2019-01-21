'use strict'
var express = require("express");
var controller = require("./profesores.controller");

var router = express.Router();

router.get("/", controller.obtenerProfesores);
router.put("/", controller.agregarProfesores);
router.delete("/:correo", controller.EliminarProfesor);
router.post("/", controller.ModificarProfesores);




module.exports = router;