'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {
      /*
      ENDPOINT de ACCESO: GET::api/profesores/
      RESULT: Array de JSON
      DESCRIPCION: Obtiene la lista de los profesores registrados en el sistema 
      */
      obtenerProfesores: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        let listaProfesores = result.val();
                        res.json({
                              message: "1",
                              data: listaProfesores
                        });
                  },
                  (error) => {
                        res.json({
                              message: `Error: firebase.database.once > docentes`,
                              data: error
                        });
                  });
      },

      /*
      ENDPOINT de ACCESO: PUT::api/profesores/
      RESULT: Array de JSON
      DESCRIPCION: Ingresa un profesor en la lista y valida que no exista otro igual.
      */
      agregarProfesores: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var datoEncontrado = true;
                        var listaProfesores = result.val();
                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.body.correo) {
                                    datoEncontrado = false;
                                    break;
                              }
                        }
                        if (datoEncontrado) {
                              var nuevoProfesor = { nombre: req.body.nombre, correo: req.body.correo, tipo: 2 };
                              listaProfesores.push(nuevoProfesor);
                              db.ref(`usuarios`).set(listaProfesores, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error
                                          });
                                    } else {
                                          res.json({
                                                message: "Se ha agregado de forma correcta la información del profesor",
                                                data: listaProfesores
                                          });
                                    }
                              });
                        } else {
                              res.json({
                                    message: "El correo que ingresó ya pertenece a otro usuario, debe ingresar otro"
                              });
                        }
                  }
            )
      },

      /*
      ENDPOINT de ACCESO: DELETE::api/profesores/correo
      RESULT: Array de JSON
      DESCRIPCION: Elimina la información de un profesor
      */
      EliminarProfesor: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var infoEncontrada = false;
                        var listaProfesores = result.val();
                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.params.correo) {
                                    listaProfesores.splice(profesor, 1);
                                    infoEncontrada = true;
                                    break;
                              }
                        }
                        if (infoEncontrada) {
                              db.ref(`usuarios`).set(listaProfesores, (error) => {
                                    if (error) {
                                          res.json({
                                                message: `Error: firebase.database.set > profesores`,
                                                data: error,
                                          });
                                    } else {
                                          res.json({
                                                message: "Se ha eliminado de forma correcta la información del profesor",
                                                data: listaProfesores,
                                          });
                                    }
                              });
                        } else {
                              res.json({
                                    message: "No se encontró la información solicitada"
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
      ENDPOINT de ACCESO: POST::api/profesores/
      RESULT: Array de JSON
      DESCRIPCION: Modifica la información de un profesor
      */
      ModificarProfesores: function (req, res) {
            db.ref(`usuarios`).once("value",
                  (result) => {
                        var datoEncontrado = false;
                        var listaProfesores = result.val();
                        var posicionProfe;

                        for (const profesor in listaProfesores) {
                              if (listaProfesores[profesor].correo == req.body.correo) {
                                    posicionProfe = profesor;
                                    datoEncontrado = true;
                                    break;
                              }
                        }
                        if (datoEncontrado) {
                              var comprobacionCorreo = true;

                              for (const profe in listaProfesores) {
                                    if(posicionProfe != profe){
                                          if (listaProfesores[profe].correo == req.body.correoNuevo) {
                                                comprobacionCorreo = false;
                                                break;
                                          }
                                    }
                                    
                              }
                              if (comprobacionCorreo) {
                                    listaProfesores[posicionProfe].correo = req.body.correoNuevo;
                                    listaProfesores[posicionProfe].nombre = req.body.nombreNuevo;

                                    db.ref(`usuarios`).set(listaProfesores, (error) => {
                                          if (error) {
                                                res.json({
                                                      message: `Error: firebase.database.set > profesores`,
                                                      data: error
                                                });
                                          } else {
                                                res.json({
                                                      message: "Se ha actualizado correctamente la información del profesor",
                                                      data: listaProfesores
                                                });
                                          }
                                    });

                              } else {
                                    res.json({
                                          data: listaProfesores,
                                          message: "El correo que ingresó pertenece a otro usuario, debe ingresar otro correo"
                                    });
                              }
                        } else {
                              res.json({
                                    message: "No se encontró la información del profesor"
                              });
                        }
                  }
            )
      }
}