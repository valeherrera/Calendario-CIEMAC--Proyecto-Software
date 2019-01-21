'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {
    /*
     ENDPOINT de ACCESO: GET::api/cursos
     RESULT: Array de JSON
     DESCRIPCION: Obtiene la lista de los temas que están registrados en curso.
     */

    getTemas: function (req, res) {
        db.ref(`cursos`).once("value",
            (result) => {
                let listaCursos = result.val();
                var cursoEncontrado = false;

                for (const curso in listaCursos) {
                    if (listaCursos[curso].codigo == req.params.codigo &&
                        listaCursos[curso].periodo == req.params.periodo &&
                        listaCursos[curso].anno == req.params.anno
                    ) {
                        if (listaCursos[curso].temas != undefined) {
                            res.json({
                                message: "Lista de temas se ha sido extraida correctamente",
                                data: listaCursos[curso].temas
                            });
                        } else {
                            res.json({
                                message: "No tiene cursos agregados actualmente"
                            });
                        }
                        cursoEncontrado = true;
                    }
                    if (cursoEncontrado) {
                        break;
                    }
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
     ENDPOINT de ACCESO: DELETE::api/imagenes/codigo/periodo/anno/tema
     RESULT: Array de JSON
     DESCRIPCION: elimina un tema
     */
    EliminarTemas: function (req, res) {
        db.ref(`cursos`).once("value",
            (result) => {
                let listaCursos = result.val();
                var cursoEncontrado = false;
                var posicionCurso;

                for (const curso in listaCursos) {
                    if (listaCursos[curso].codigo == req.params.codigo && listaCursos[curso].periodo == req.params.periodo && listaCursos[curso].anno == req.params.anno) {
                        if (listaCursos[curso].temas != undefined) {
                            for (const tema in listaCursos[curso].temas) {
                                if (listaCursos[curso].temas[tema].nombre == req.params.tema) {

                                    listaCursos[curso].temas.splice(tema, 1);
                                    posicionCurso = curso;
                                }
                            }
                        } else {
                            res.json({
                                message: "No tiene temas agregados actualmente"
                            });
                        }
                        cursoEncontrado = true;
                    }
                    if (cursoEncontrado) {
                        break;
                    }
                }
                db.ref(`cursos`).set(listaCursos, (error) => {
                    if (error) {
                        res.json({
                            message: `Error: firebase.database.set > profesores`,
                            data: error
                        });
                    } else {
                        res.json({
                            message: `Se ha eliminado de forma correcta`,
                            data: listaCursos[posicionCurso].temas
                        });
                    }
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
      ENDPOINT de ACCESO: POST::api/temaas/
      RESULT: Array de JSON
      DESCRIPCION: Modifica la información de un tema
    */
    ModificarTema: function (req, res) {
        db.ref(`cursos`).once("value",
            (result) => {
                let listaCursos = result.val();
                var cursoEncontrado = false;
                var cursoRepetido = false;
                var posicionCurso;
                var posicionTema;


                for (const curso in listaCursos) {
                    if (listaCursos[curso].codigo == req.body.codigo && listaCursos[curso].periodo == req.body.periodo && listaCursos[curso].anno == req.body.anno) {
                        for (const tema in listaCursos[curso].temas) {
                            if (listaCursos[curso].temas[tema].nombre == req.body.tema) {
                                posicionCurso = curso;
                                posicionTema = tema;
                            }
                        }
                        cursoEncontrado = true;
                    }
                    if (cursoEncontrado) {

                        break;
                    }
                }
                if (cursoEncontrado) {
                    for (const temaRepetido in listaCursos[posicionCurso].temas) {

                        if (listaCursos[posicionCurso].temas[temaRepetido].nombre == req.body.temaNuevo) {

                            cursoRepetido = true;
                            break;
                        }
                    }

                    if (cursoRepetido) {

                        res.json({
                            message: `No puede agregar ese nombre, ya pertencese a otro tema`
                        });
                    } else {

                        listaCursos[posicionCurso].temas[posicionTema].nombre = req.body.temaNuevo;
                        db.ref(`cursos`).set(listaCursos, (error) => {
                            if (error) {
                                res.json({
                                    message: `Error: firebase.database.set > profesores`,
                                    data: error
                                });
                            } else {

                                res.json({
                                    message: `Se ha actualizado de forma correcta el tema`,
                                    data: listaCursos[posicionCurso].temas
                                });
                            }
                        });
                    }
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
     ENDPOINT de ACCESO: PUT::api/temas/
     RESULT: Array de JSON
     DESCRIPCION: Agrega la información de un tema
    */    
    AgregarTemas: function (req, res) {
        db.ref(`cursos`).once("value",
            (result) => {

                var contieneAtributo = false;
                var cursoRepetido = false;
                var listaCursos = result.val();
                var posicionCurso = 0;
                var cursoEncontrado = false;

                for (const curso in listaCursos) {
                    if (listaCursos[curso].codigo == req.body.codigo && listaCursos[curso].periodo == req.body.periodo && listaCursos[curso].anno == req.body.anno) {
                        if (listaCursos[curso].temas != undefined) {
                            contieneAtributo = true;
                            for (const tema in listaCursos[curso].temas) {
                                if (listaCursos[curso].temas[tema].nombre == req.body.tema) {
                                    cursoRepetido = true;
                                    break;
                                }
                            }
                        }
                        cursoEncontrado = true;
                    }
                    if (cursoEncontrado) {
                        posicionCurso = curso;
                        break;
                    }
                }
                if (cursoRepetido) {
                    res.json({
                        message: `El nombre que eligió ya se encuentra en tro tema`,
                        data: listaCursos[posicionCurso].temas

                    });
                } else {
                    if (contieneAtributo) {
                        listaCursos[posicionCurso].temas.push({ nombre: req.body.tema });
                    } else {
                        listaCursos[posicionCurso].temas = [{ nombre: req.body.tema }]
                    }
                    db.ref(`cursos`).set(listaCursos, (error) => {
                        if (error) {
                            res.json({
                                message: `Error: firebase.database.set > profesores`,
                                data: error
                            });
                        }
                        else {

                            res.json({
                                message: `Se ha agregado el curso con exito`,
                                data: listaCursos[posicionCurso].temas
                            });
                        }
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


}