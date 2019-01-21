'use strict'

module.exports = function route(app){
      app.use("/profesores", require("./profesores"));
      app.use("/cursos", require("./cursos"));
      app.use("/ejercicios", require("./ejercicios"));
      app.use("/cuenta", require("./cuenta"));
      app.use("/temas", require("./temas"));
      app.use("/imagenes", require("./imagenes"));
};