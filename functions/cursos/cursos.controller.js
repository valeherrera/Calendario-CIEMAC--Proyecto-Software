'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {

      /*
     ENDPOINT de ACCESO: GET::api/cursos/
     RESULT: Array de JSON
     DESCRIPCION: Obtiene la lista de los cursos que tiene registrado el profesor en el sistema.
     */
      getCursos: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        let listaProfesores = result.val();
                        var posicionProfesor;
                        var existeAtributo = true;
                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.params.correo) {
                                    if (listaProfesores[profesor].cursos == undefined) {
                                          existeAtributo = false;
                                    }
                                    posicionProfesor = profesor;
                                    break;
                              }
                        }
                        if (!existeAtributo) {

                              res.json({
                                    message: "No tiene cursos agregados actualmente"
                              });
                        } else {

                              res.json({
                                    message: "Lista de cursos extraida correctamente",
                                    data: listaProfesores[posicionProfesor].cursos

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
     ENDPOINT de ACCESO: GET::api/cursos/cursosDisponibles
     RESULT: Array de JSON
     DESCRIPCION: Obtiene la lista de los cursos que hay en el sistema y n tiene agregados
     */
      getCursosDisponibles: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {

                        let listaProfesores = result.val();
                        var datoProfesor = false;
                        var posicionProfesor;
                        var cursosProfesor = [];
                        var cursosDisponibles = [];
                        var existeAtributo = true;

                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.params.correo) {
                                    if (listaProfesores[profesor].cursos == undefined) {
                                          existeAtributo = false;
                                    }
                                    posicionProfesor = profesor;
                                    datoProfesor = true;
                                    break;
                              }
                        }

                        if (datoProfesor) {
                              db.ref(`cursos`).once("value",
                                    (result) => {
                                          let listaCursos = result.val();
                                          if (!existeAtributo) {
                                                res.json({
                                                      message: "Lista de cursos disponibles extraida correctamente",
                                                      data: listaCursos
                                                });

                                          } else {
                                                cursosProfesor = listaProfesores[posicionProfesor].cursos;
                                                var coincidencia = false;
                                                for (const curso in listaCursos) {
                                                      coincidencia = false;
                                                      for (const materia in cursosProfesor) {
                                                            if (listaCursos[curso].codigo == cursosProfesor[materia].codigo) {
                                                                  if (listaCursos[curso].periodo == cursosProfesor[materia].periodo && listaCursos[curso].anno == cursosProfesor[materia].anno) {
                                                                        coincidencia = true;
                                                                  }
                                                            }
                                                      }
                                                      if (!coincidencia) {
                                                            cursosDisponibles.push(listaCursos[curso])
                                                      }
                                                }
                                                res.json({
                                                      message: "Lista de cursos disponibles extraida correctamente",
                                                      data: cursosDisponibles
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
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > profesores`,
                              data: error
                        });
                  });
      },

      /*
     ENDPOINT de ACCESO: DELETE::api/cursos/codigoCurso/correo/periodo/anno
     RESULT: Array de JSON
     DESCRIPCION: elimina un curso de la lista de un profesor.
     */
      EliminarCursos: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var infoEncontrada = false;
                        var listaProfesores = result.val();
                        var posicionProfesor = 0;
                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.params.correo) {
                                    infoEncontrada = true;
                                    posicionProfesor = profesor;
                                    break;
                              }
                        }
                        if (infoEncontrada) {
                              for (const curso in listaProfesores[posicionProfesor].cursos) {
                                    if (listaProfesores[posicionProfesor].cursos[curso].codigo == req.params.codigoCurso &&
                                          listaProfesores[posicionProfesor].cursos[curso].periodo == req.params.periodo &&
                                          listaProfesores[posicionProfesor].cursos[curso].anno == req.params.anno) {

                                          listaProfesores[posicionProfesor].cursos.splice(curso, 1);
                                          break;
                                    }
                              }
                              db.ref(`usuarios`).set(listaProfesores, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    }
                              });
                        }
                        res.json({
                              message: "Se ha eliminado el curso de forma correcta",
                              data: listaProfesores[posicionProfesor].cursos,
                        });
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > cursos`,
                              data: error
                        });
                  });
      },


      /*
     ENDPOINT de ACCESO: PUT::api/cursos/
     RESULT: Array de JSON
     DESCRIPCION: Agrega la información de un curso.
     */
      AgregarCursos: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var datoEncontrado = false;
                        var cursoEncontrado = false;
                        var listaProfesores = result.val();
                        var posicionProfesor = 0;
                        var existeAtributo = true;
                        var posicionCurso;

                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.body.correo) {
                                    if (listaProfesores[profesor].cursos == undefined) {
                                          
                                          listaProfesores[posicionProfesor].cursos = [{ nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno }]
                                          existeAtributo = false;
                                    }
                                    posicionProfesor = profesor;
                                    datoEncontrado = true;
                                    break;
                              }
                        }

                        if (datoEncontrado == true && existeAtributo == true) {
                              
                              for (const curso in listaProfesores[posicionProfesor].cursos) {
                                    if (listaProfesores[posicionProfesor].cursos[curso].codigo == req.body.codigo &&
                                          listaProfesores[posicionProfesor].cursos[curso].periodo == req.body.periodo &&
                                          listaProfesores[posicionProfesor].cursos[curso].anno == req.body.anno) {
                                          cursoEncontrado = true;
                                          break;
                                    }
                              }

                              if (!cursoEncontrado) {
 


                                    listaProfesores[posicionProfesor].cursos.push({ nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno });
                                    db.ref(`usuarios`).set(listaProfesores, (error) => {
                                          if (error) {
                                                res.json({
                                                      message: `Error: firebase.database.set > profesores`,
                                                      data: error
                                                });
                                          }
                                    });

                                    db.ref(`cursos`).once("value",
                                          (result) => {
                                                var infoEncontrada = false;
                                                var listaCursos = result.val();

                                                for (const curso in listaCursos) {

                                                      if (listaCursos[curso].codigo == req.body.codigo &&
                                                            listaCursos[curso].periodo == req.body.periodoAnterior &&
                                                            listaCursos[curso].anno == req.body.annoAnterior) {
                                                            posicionCurso = curso;
                                                      }
                                                }

                                                for (const curso in listaCursos) {
                                                      if (listaCursos[curso].codigo == req.body.codigo &&
                                                            listaCursos[curso].periodo == req.body.periodo &&
                                                            listaCursos[curso].anno == req.body.anno) {
                                                            infoEncontrada = true;
                                                            break;
                                                      }
                                                }
                                                if (!infoEncontrada) {
                                                      var nuevoCurso;
                                                      if (req.body.chkRestaurar == true) {
                                                            
                                                            if(listaCursos[posicionCurso].temas==undefined){
                                                                  
                                                                  nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno };
                                                            }
                                                            else{
                                                                  
                                                                  nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno, temas: listaCursos[posicionCurso].temas };
                                                            }
                                                      }
                                                      else {
                                                            nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno };
                                                      }
                                                      listaCursos.push(nuevoCurso);
                                                      db.ref(`cursos`).set(listaCursos, (error) => {
                                                            if (error) {
                                                                  res.json({
                                                                        message: `Error: firebase.database.set > profesores`,
                                                                        data: error
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
                                    res.json({
                                          message: "Se ha agregado el curso de forma correcta",
                                          data: listaProfesores[posicionProfesor].cursos
                                    });
                              }
                              else {
                                    res.json({
                                          message: "El curso que desea agregar ya se encuentra en su lista",
                                          data: listaProfesores[posicionProfesor].cursos
                                    });
                              }
                        }else if(datoEncontrado == true && existeAtributo == false){
                              db.ref(`usuarios`).set(listaProfesores, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    }
                              });

                              db.ref(`cursos`).once("value",
                                    (result) => {
                                          var infoEncontrada = false;
                                          var listaCursos = result.val();

                                          for (const curso in listaCursos) {

                                                if (listaCursos[curso].codigo == req.body.codigo &&
                                                      listaCursos[curso].periodo == req.body.periodoAnterior &&
                                                      listaCursos[curso].anno == req.body.annoAnterior) {
                                                      posicionCurso = curso;
                                                }
                                          }

                                          for (const curso in listaCursos) {
                                                if (listaCursos[curso].codigo == req.body.codigo &&
                                                      listaCursos[curso].periodo == req.body.periodo &&
                                                      listaCursos[curso].anno == req.body.anno) {
                                                      infoEncontrada = true;
                                                      break;
                                                }
                                          }
                                          if (!infoEncontrada) {
                                                var nuevoCurso;
                                                if (req.body.chkRestaurar == true) {
                                                      
                                                      if(listaCursos[posicionCurso].temas==undefined){
                                                            
                                                            nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno };
                                                      }
                                                      else{
                                                            
                                                            nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno, temas: listaCursos[posicionCurso].temas };
                                                      }
                                                }
                                                else {
                                                      nuevoCurso = { nombre: req.body.nombre, codigo: req.body.codigo, periodo: req.body.periodo, anno: req.body.anno };
                                                }
                                                listaCursos.push(nuevoCurso);
                                                db.ref(`cursos`).set(listaCursos, (error) => {
                                                      if (error) {
                                                            res.json({
                                                                  message: `Error: firebase.database.set > profesores`,
                                                                  data: error
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
                              res.json({
                                    message: "Se ha agregado el curso de forma correcta",
                                    data: listaProfesores[posicionProfesor].cursos
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


      //-------------------------------------------------------------------------------------------------------------------------------------------
      /*
      Método sin terminar
      Motivo: requerimiento no implementado por motivos de ambiguedad
      */
      ModificarCurso: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var datoEncontrado = false;
                        var listaProfesores = result.val();
                        var posicionProfesor;

                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.body.correo) {
                                    posicionProfesor = profesor;
                                    datoEncontrado = true;
                                    break;
                              }
                        }
                        if (datoEncontrado) {

                              var comprobacionCurso = false;
                              for (const curso in listaProfesores[posicionProfesor].cursos) {
                                    if (listaProfesores[posicionProfesor].cursos[curso].codigo == req.body.codigo &&
                                          listaProfesores[posicionProfesor].cursos[curso].periodo == req.body.periodoActual &&
                                          listaProfesores[posicionProfesor].cursos[curso].anno == req.body.annoActual) {

                                          listaProfesores[posicionProfesor].cursos[curso].periodo = req.body.periodo;
                                          listaProfesores[posicionProfesor].cursos[curso].anno = req.body.anno;
                                          comprobacionCurso = true;
                                          break;
                                    }
                              }
                              if (!comprobacionCurso) {
                                    res.json({
                                          message: "No existe el curso curso"
                                    });
                              }
                              else {
                                    db.ref(`usuarios`).set(listaProfesores, (error) => {
                                          if (error) {
                                                res.json({
                                                      message: `Error: firebase.database.set > profesores`,
                                                      data: error
                                                });
                                          }
                                    });
                                    res.json({
                                          message: "Se ha modificado de forma correcta la información",
                                          data: listaProfesores[posicionProfesor].cursos
                                    });
                              }
                        }
                  }
            )
      }






}
