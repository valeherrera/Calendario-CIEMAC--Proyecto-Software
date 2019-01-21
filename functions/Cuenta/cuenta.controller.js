'use strict'

var admin = require("firebase-admin");
var db = admin.database();

module.exports = {

    /*
     ENDPOINT de ACCESO: GET::api/cuenta/correo
     RESULT: Array de JSON
     DESCRIPCION: Comprueba que tipo de usuario es en caso de estar registrado en el sistema
     */
    comprobacionCuenta: function (req, res) {
        db.ref(`usuarios`).once("value",
            (result) => {
                let listaUsuarios = result.val();
                var existeUsuario = false;
                var tipoUsuario;

                for (const usuario in listaUsuarios) {
                    if (listaUsuarios[usuario].correo == req.params.correo) {
                        tipoUsuario = listaUsuarios[usuario].tipo;
                        existeUsuario = true;
                        break;
                    }
                }
                if (!existeUsuario) {
                    res.json({
                        message: "Esta cuenta no está registrada aún en el sistema"
                    });
                } else {
                    res.json({
                        message: "Tipo de usuario: ",
                        data: tipoUsuario
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
