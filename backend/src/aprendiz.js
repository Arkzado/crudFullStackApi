import express, { request, response } from "express";
import connection from "../conexion.js";

let aprendiz = express.Router();

aprendiz.get("/aprendiz/listarTodos", async (request, response) => {
  let consulta = "SELECT * FROM aprendiz";

  try {
    let [resultado] = await connection.query(consulta);
    response.send({ resultado });
    response.send({
      estado: "ok",
      data: resultado,
    });
  } catch (err) {
    response.status(500).send({
      estado: "error",
      data: "se pudrio todo",
    });
  }
});

aprendiz.get(
  "/aprendiz/buscarAprendiz/:id_aprendiz",
  async (request, response) => {
    try {
      let id = request.params.id_aprendiz;
      let consulta = `SELECT * FROM aprendiz WHERE id_aprendiz = ?`;
      let [resultado] = await connection.query(consulta, [id]);

      response.send({ resultado });
      response.send({
        estado: "ok",
        data: "etamo melos",
      });
    } catch (err) {
      response.status(500).send({
        estado: "error",
        data: "se pudrio todo",
      });
    }
  }
);

aprendiz.post("/aprendiz/crear", async (request, response) => {
  try {
    let datosFormulario = {
      nombre: request.body.nombre,
      apellido: request.body.apellido,
      correo: request.body.correo,
    };
    console.log(datosFormulario);
    let consulta = "INSERT INTO aprendiz SET ?";
    let [resultado] = await connection.query(consulta, [datosFormulario]);

    response.send({ resultado });
    response.send({
      estado: "ok",
      data: "etamo melos",
    });
  } catch (err) {
    response.status(500).send({
      estado: "error",
      data: err.message,
    });
  }
});

aprendiz.put(
  "/aprendiz/editarAprendiz/:id_aprendiz",
  async (request, response) => {
    try {
      let id = request.params.id_aprendiz;
      let datosFormulario = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        correo: request.body.correo,
      };

      let consulta = `UPDATE aprendiz SET ? WHERE id_aprendiz = ?`;
      let [resultado] = await connection.query(consulta, [datosFormulario, id]);

      response.send({ resultado });
      response.send({
        estado: "ok",
        data: "etamo melos",
      });
    } catch (err) {
      response.status(500).send({
        estado: "error",
        data: err.message,
      });
    }
  }
);

aprendiz.delete(
  "/aprendiz/eliminarAprendiz/:id_aprendiz",
  async (request, response) => {
    try {
      let id = request.params.id_aprendiz;

      let consulta = `DELETE FROM aprendiz WHERE id_aprendiz = ?`;
      let [resultado] = await connection.query(consulta, [id]);

      response.send({ resultado });
      response.send({
        estado: "ok",
        data: "etamo melos",
      });
    } catch (err) {
      response.status(500).send({
        estado: "error",
        data: err.message,
      });
    }
  }
);

aprendiz.put(
  "/aprendiz/cambiarEstadoAprendiz/:id_aprendiz",
  async (request, response) => {
    try {
      let id = request.params.id_aprendiz;
      let datosFormulario = {
        estado: request.body.estado,
      };

      let consulta = `UPDATE aprendiz SET ? WHERE id_aprendiz = ?`;
      let [resultado] = await connection.query(consulta, [datosFormulario, id]);

      response.send({ resultado });
      response.send({
        estado: "ok",
        data: "etamo melos",
      });
    } catch (err) {
      response.status(500).send({
        estado: "error",
        data: err.message,
      });
    }
  }
);
export default aprendiz;
