'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {

      /*
      ENDPOINT de ACCESO: GET::api/ejercicios/
      RESULT: Array de JSON
      DESCRIPCION: Obtiene la lista de los ejercicios que pertenecen a un tema de un curso específico
      */

      getEjercicios: function (req, res) {
            db.ref(`cursos`).once("value",
                  (result) => {

                        let listaCursos = result.val();
                        var cursoEncontrado = false;
                        for (const curso in listaCursos) {
                              if (listaCursos[curso].codigo == req.params.codigo &&
                                    listaCursos[curso].periodo == req.params.periodo &&
                                    listaCursos[curso].anno == req.params.anno) {
                                    if (listaCursos[curso].temas != undefined) {
                                          for (const ejercicios in listaCursos[curso].temas) {
                                                if (listaCursos[curso].temas[ejercicios].nombre == req.params.tema) {
                                                      if (listaCursos[curso].temas[ejercicios].ejercicios != undefined) {
                                                            res.json({
                                                                  message: "los ejercicios se han extraído correctamente",
                                                                  data: listaCursos[curso].temas[ejercicios].ejercicios

                                                            });
                                                      } else {
                                                            res.json({
                                                                  message: "No tiene ejercicios agregados"
                                                            });
                                                      }
                                                      break;
                                                }
                                          }
                                    }
                                    else {
                                          res.json({
                                                message: "No tiene temas aún"
                                          });
                                    }
                                    cursoEncontrado = true;
                                    break;

                              }
                        }
                        if (!cursoEncontrado) {
                              res.json({
                                    message: "El curso ya no se encuentra en la lista"
                              });
                        }
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > profesores`,
                              data: error

                        });
                  });
      },

      /*
      ENDPOINT de ACCESO: POST::api/ejercicios/
      RESULT: Array de JSON
      DESCRIPCION: Modifica la información de un ejercicios
      */
      ModificarEjercicio: function (req, res) {
            db.ref(`cursos`).once("value",
                  (result) => {
                        var listaCursos = result.val();
                        var datoEncontrado = false;
                        var posicionCurso;
                        var posicionTema;
                        var cursoEncontrado = false;

                        for (const curso in listaCursos) {
                              if (listaCursos[curso].codigo == req.body.codigo &&
                                    listaCursos[curso].periodo == req.body.periodo &&
                                    listaCursos[curso].anno == req.body.anno) {

                                    for (const tema in listaCursos[curso].temas) {
                                          if (listaCursos[curso].temas[tema].nombre == req.body.tema) {
                                                listaCursos[curso].temas[tema].ejercicios[req.body.posicion].nombre = req.body.idNombreEjercicio;
                                                listaCursos[curso].temas[tema].ejercicios[req.body.posicion].fecha = req.body.fechaEjercicio;
                                                listaCursos[curso].temas[tema].ejercicios[req.body.posicion].planteamiento = req.body.imagenPlanteamiento;
                                                listaCursos[curso].temas[tema].ejercicios[req.body.posicion].problema = req.body.imagenProblema;
                                                listaCursos[curso].temas[tema].ejercicios[req.body.posicion].solucion = req.body.imagenSolucion;
                                                posicionCurso = curso;
                                                posicionTema = tema;
                                                datoEncontrado = true;
                                                break;
                                          }
                                    }
                                    cursoEncontrado = true;
                              }
                              if (datoEncontrado) {
                                    break;
                              }
                        }
                        if (!cursoEncontrado) {
                              res.json({
                                    message: `El curso ya no se encuentra en la lista`
                              });
                        }
                        else {
                              db.ref(`cursos`).set(listaCursos, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    } else {
                                          res.json({
                                                message: `Se ha modificado de forma correcta el ejercicio`,
                                                data: listaCursos[posicionCurso].temas[posicionTema].ejercicios
                                          });
                                    }
                              });
                        }
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > cursos`,
                              data: error
                        });
                  });
      },


      /*
      ENDPOINT de ACCESO: PUT::api/ejercicio/
      RESULT: Array de JSON
      DESCRIPCION: Ingresa un ejercicio a un tema que pertenece a un curso.
      */
      agregarEjercicio: function (req, res) {
            db.ref(`cursos`).once("value",
                  (result) => {
                        var listaCursos = result.val();
                        var datoEncontrado = false;
                        var posicionCurso;
                        var posicionTema;
                        var cursoEncontrado = false;

                        for (const curso in listaCursos) {
                              if (listaCursos[curso].codigo == req.body.codigo &&
                                    listaCursos[curso].periodo == req.body.periodo &&
                                    listaCursos[curso].anno == req.body.anno) {

                                    for (const tema in listaCursos[curso].temas) {
                                          if (listaCursos[curso].temas[tema].nombre == req.body.tema) {
                                                if (listaCursos[curso].temas[tema].ejercicios == undefined) {
                                                      listaCursos[curso].temas[tema].ejercicios = [{
                                                            nombre: req.body.idNombreEjercicio,
                                                            fecha: req.body.fechaEjercicio,
                                                            planteamiento: req.body.imagenPlanteamiento,
                                                            problema: req.body.imagenProblema,
                                                            solucion: req.body.imagenSolucion
                                                      }]
                                                } else {
                                                      var nuevoEjercicio = {
                                                            nombre: req.body.idNombreEjercicio,
                                                            fecha: req.body.fechaEjercicio,
                                                            planteamiento: req.body.imagenPlanteamiento,
                                                            problema: req.body.imagenProblema,
                                                            solucion: req.body.imagenSolucion
                                                      }
                                                      listaCursos[curso].temas[tema].ejercicios.push(nuevoEjercicio);
                                                }
                                                posicionCurso = curso;
                                                posicionTema = tema;
                                                datoEncontrado = true;
                                                break;
                                          }
                                    }
                                    cursoEncontrado = true;
                              }
                              if (datoEncontrado) {
                                    break;
                              }
                        }
                        if (!cursoEncontrado) {
                              res.json({
                                    message: `El curso ya no se encuentra en el sistema`
                              });
                        } else {
                              db.ref(`cursos`).set(listaCursos, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    } else {
                                          res.json({
                                                message: `Se ha agregado de forma correcta el ejercicio`,
                                                data: listaCursos[posicionCurso].temas[posicionTema].ejercicios
                                          });
                                    }
                              });
                        }
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > cursos`,
                              data: error
                        });
                  });
      },

      /*
      ENDPOINT de ACCESO: DELETE::api/ejercicios/codigo/periodo/anno/tema/posicionEjercicio
      RESULT: Array de JSON
      DESCRIPCION: Elimina la información de un ejercicio
      */
      eliminarEjercicio: function (req, res) {
            db.ref(`cursos`).once("value",
                  (result) => {
                        var listaCursos = result.val();
                        var datoEncontrado = false;
                        var posicionCurso;
                        var posicionTema;
                        var cursoEncontrado = false;

                        for (const curso in listaCursos) {
                              if (listaCursos[curso].codigo == req.params.codigo &&
                                    listaCursos[curso].periodo == req.params.periodo &&
                                    listaCursos[curso].anno == req.params.anno) {

                                    for (const tema in listaCursos[curso].temas) {
                                          if (listaCursos[curso].temas[tema].nombre == req.params.tema) {
                                                listaCursos[curso].temas[tema].ejercicios.splice(req.params.posicionEjercicio, 1);
                                                posicionCurso = curso;
                                                posicionTema = tema;
                                                datoEncontrado = true;
                                                break;
                                          }
                                    }
                                    cursoEncontrado = true;
                              }
                              if (datoEncontrado) {
                                    break;
                              }
                        }
                        if (!cursoEncontrado) {
                              res.json({
                                    message: `El curso no se encuentra en el sistema`
                              });
                        }
                        else {
                              db.ref(`cursos`).set(listaCursos, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    } else {
                                          res.json({
                                                message: `Se ha eliminado de forma correcta`,
                                                data: listaCursos[posicionCurso].temas[posicionTema].ejercicios
                                          });
                                    }
                              });
                        }
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > cursos`,
                              data: error
                        });
                  });
      }
}
