import express, { request, response } from "express";
import connection from "../conexion.js";


let ficha = express.Router();

ficha.get("/ficha/listarFichas", async (request, response) => {
    let consulta = "SELECT * FROM ficha";
    try {
        let [resultado] = await connection.query(consulta);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        });
    }
});

ficha.post("/ficha/crear", async (request, response) => {
    let consulta = "INSERT INTO ficha SET ?";
    let datosFicha = {
        nombre: request.body.nombre,
        fecha_inicio: request.body.fecha_inicio,
        fecha_fin: request.body.fecha_fin,
    }
    try {
        let [resultado] = await connection.query(consulta, [datosFicha]);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        });
    }
});

ficha.put("/ficha/editarFicha/:id_ficha", async (request, response) => {
    let id_ficha = request.params.id_ficha;
    let consulta = "UPDATE ficha SET ? WHERE id_ficha = ?";
    let datosFicha = {
        nombre: request.body.nombre,
        fecha_inicio: request.body.fecha_inicio,
        fecha_fin: request.body.fecha_fin,
    }
    try {
        let [resultado] = await connection.query(consulta, [datosFicha, id_ficha]);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        });
    }
});

ficha.get("/ficha/buscarFicha/:id_ficha", async (request, response) => {
    let id_ficha = request.params.id_ficha;
    let consulta = "SELECT * FROM ficha WHERE id_ficha = ?";
    try {
        let [resultado] = await connection.query(consulta, [id_ficha]);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        });
    }
});

ficha.delete("/ficha/eliminarFicha/:id_ficha", async (request, response) => {
    let id_ficha = request.params.id_ficha;
    let consulta = "DELETE FROM ficha WHERE id_ficha = ?";
    try {
        let [resultado] = await connection.query(consulta, [id_ficha]);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        })
    }
});

ficha.put("/ficha/cambiarEstado/:id_ficha", async (request, response) => {
    let id_ficha = request.params.id_ficha;
    let consulta = "UPDATE ficha SET ? WHERE id_ficha = ?";
    let datosFicha = {
        estado: request.body.estado
    }
    try {
        let [resultado] = await connection.query(consulta, [datosFicha, id_ficha]);
        response.send({ resultado });
    }
    catch (error) {
        response.status(500).send({
            estado: "error",
            data: error.message
        });
    }
});

export default ficha;