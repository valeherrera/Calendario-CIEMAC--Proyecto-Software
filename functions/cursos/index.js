'use strict'
var express = require("express");
var controller = require("./cursos.controller");

var router = express.Router();
router.get("/:correo", controller.getCursos);

router.get("/cursosDisponibles/:correo", controller.getCursosDisponibles);
router.delete("/:codigoCurso/:correo/:periodo/:anno", controller.EliminarCursos);
router.put("/", controller.AgregarCursos);
router.post("/", controller.ModificarCurso);


module.exports = router;