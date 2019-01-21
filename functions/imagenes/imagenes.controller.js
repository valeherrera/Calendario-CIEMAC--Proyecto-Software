'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {

    /*
     ENDPOINT de ACCESO: GET::api/imagenes/
     RESULT: Array de JSON
     DESCRIPCION: Obtiene la lista de llas imágenes que tiene el sistema
     */
    getImagenes: function (req, res) {
        db.ref(`imagenes`).once("value",
            (result) => {

                let listaImagenes = result.val();
                res.json({
                    message: "los ejercicios se han extraído correctamente",
                    data: listaImagenes
                });
            },
            (error) => {
                res.json({
                    message: `Error: firebase.database.once > profesores`,
                    data: error

                });
            });
    },

    /*
     ENDPOINT de ACCESO: PUT::api/imagenes/
     RESULT: Array de JSON
     DESCRIPCION: Agrega la información de una imagen
    */    
    agregarImagen: function (req, res) {
        db.ref(`imagenes`).once("value",
            (result) => {
                var listaImagenes = result.val();

                //idNombre, idNombreAutor, idDescripcion ,fechaInicio,fechaFinal,imagenArteActual
                var nuevaImagen = {
                    nombre: req.body.idNombre,
                    fechaInicio: req.body.fechaInicio,
                    fechaFinal: req.body.fechaFinal,
                    autor: req.body.idNombreAutor,
                    descripcion: req.body.idDescripcion,
                    imagen: req.body.imagenArteActual
                }

                listaImagenes.push(nuevaImagen);

                db.ref(`imagenes`).set(listaImagenes, (error) => {
                    if (error) {
                        res.json({
                            message: `Error: firebase.database.set > profesores`,
                            data: error
                        });
                    } else {
                        res.json({
                            message: `Se ha agregado de forma correcta la imagen`,
                            data: listaImagenes
                        });
                    }
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
     ENDPOINT de ACCESO: DELETE::api/imagenes/posicionImagen
     RESULT: Array de JSON
     DESCRIPCION: elimina una imagen seleccionada
     */
    eliminarImagen: function (req, res) {
        db.ref(`imagenes`).once("value",
            (result) => {
                var listaImagenes = result.val();
                listaImagenes.splice(req.params.posicionImagen, 1);

                db.ref(`imagenes`).set(listaImagenes, (error) => {
                    if (error) {
                        res.json({
                            message: `Error: firebase.database.set > profesores`,
                            data: error
                        });
                    } else {
                        res.json({
                            message: `Se ha eliminado de forma correcta la imagen`,
                            data: listaImagenes
                        });
                    }
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
      ENDPOINT de ACCESO: POST::api/imagenes/
      RESULT: Array de JSON
      DESCRIPCION: Modifica la información de una imagen
    */
    ModificarImagen: function (req, res) {
        db.ref(`imagenes`).once("value",
              (result) => {
                    var listaImagenes = result.val();

                    listaImagenes[req.body.posicionImagen].nombre= req.body.idNombreNuevo;
                    listaImagenes[req.body.posicionImagen].fechaInicio= req.body.fechaInicioNueva;
                    listaImagenes[req.body.posicionImagen].fechaFinal= req.body.fechaFinalNueva;
                    listaImagenes[req.body.posicionImagen].autor= req.body.idNombreAutorNuevo;
                    listaImagenes[req.body.posicionImagen].descripcion= req.body.idDescripcionNueva;
                    listaImagenes[req.body.posicionImagen].imagen= req.body.imagenNueva;

                    db.ref(`imagenes`).set(listaImagenes, (error) => {
                        if (error) {
                              res.json({
                                    message: `Error: firebase.database.set > profesores`,
                                    data: error
                              });
                        } else {
                              res.json({
                                    message: `Se ha modificado de forma correcta la informacion de la imagen`,
                                    data: listaImagenes
                              });
                        }
                  });
              },
              (error) => {
                    res.json({
                          message: `Error: firebase.database.once > cursos`,
                          data: error
                    });
              });
  },




}