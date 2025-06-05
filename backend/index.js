import express from "express";
import aprendiz from "./src/aprendiz.js";
import ficha from "./src/ficha.js";

let appAprendiz = express();
appAprendiz.use(express.json());
appAprendiz.use("/", aprendiz);

appAprendiz.get("/", (request, response) => {
    response.send("hola mundo de tetas");
})



const puertoAprendiz = 4000;
appAprendiz.listen(puertoAprendiz, async() => {
    console.log(`http://localhost:${puertoAprendiz}: etamo melos`);
});

let appFicha = express();
appFicha.use(express.json());
appFicha.use("/", ficha);

appFicha.get("/", (request, response) => {
    response.send("hola mundo de tetas");
})



const puertoFicha = 4001;
appFicha.listen(puertoFicha, async() => {
    console.log(`http://localhost:${puertoFicha}: sizas`);
});