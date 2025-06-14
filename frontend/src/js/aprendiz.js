import * as bootstrap from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

const myModal = new bootstrap.Modal(document.getElementById("modalAprendiz"));
const frmAprendiz = document.getElementById("frmAprendiz");
const btnModal = document.getElementById("btnModal");
const btnGuardar = document.getElementById("btnGuardar");
const btnEditar = document.getElementById("btnEditar");

const url = "http://localhost:4000/aprendiz/";

document.addEventListener("DOMContentLoaded", cargarAprendices);
btnModal.addEventListener("click", () => {
  const tituloModal = document.getElementById("tituloModal");
  const btnEditar = document.getElementById("btnEditar");
  const btnGuardar = document.getElementById("btnGuardar");

  btnEditar.style.display = "none";
  btnGuardar.style.display = "block";
  tituloModal.textContent = "Crear Aprendiz";
  document.getElementById("frmAprendiz").reset();
  myModal.toggle();
});

btnGuardar.addEventListener("click", guardarAprendiz);
btnEditar.addEventListener("click", editarAprendiz);

function cargarAprendices() {
  fetch(`${url}listarTodos`)
    .then((response) => response.json())
    .then((data) => {
      llenarTabla(data);
    });
}

function llenarTabla(datos) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  const aprendices = datos.resultado;

  aprendices.forEach((aprendiz) => {
    if (aprendiz.estado == "1") {
      const tr = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdNombre = document.createElement("td");
      const tdApellido = document.createElement("td");
      const tdCorreo = document.createElement("td");
      const tdEditar = document.createElement("td");
      const tdEliminar = document.createElement("td");
      const iconoEliminar = document.createElement("i");
      const iconoEditar = document.createElement("i");

      const btnEditar = document.createElement("button");
      const btnEliminar = document.createElement("button");

      btnEditar.classList.add("btn", "btn-warning");
      btnEliminar.classList.add("btn", "btn-danger");
      iconoEditar.classList.add("bi", "bi-pencil-square");
      iconoEliminar.classList.add("bi", "bi-trash3-fill");

      btnEliminar.appendChild(iconoEliminar);
      btnEditar.appendChild(iconoEditar);

      btnEditar.addEventListener("click", () => modalEditarAprendiz(aprendiz));

      tdId.innerText = aprendiz.id_aprendiz;
      tdNombre.innerText = aprendiz.nombre;
      tdApellido.innerText = aprendiz.apellido;
      tdCorreo.innerText = aprendiz.correo;
      tdEditar.appendChild(btnEditar);
      tdEliminar.appendChild(btnEliminar);

      tr.appendChild(tdId);
      tr.appendChild(tdNombre);
      tr.appendChild(tdApellido);
      tr.appendChild(tdCorreo);
      tr.appendChild(tdEditar);
      tr.appendChild(tdEliminar);
      tbody.appendChild(tr);
    }
  });
}

function guardarAprendiz() {
  const nombre = document.getElementById("nombreAprendiz").value.trim();
  const apellido = document.getElementById("apellidoAprendiz").value.trim();
  const correo = document.getElementById("correoAprendiz").value.trim();

  if (nombre.length > 0 && apellido.length > 0 && correo.length > 0) {
    fetch(`${url}crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.resultado.affectedRows === 1) {
          Swal.fire({
            title: "Aprendiz agregado con exito",
            icon: "success",
            draggable: true,
          });
          myModal.hide();
          cargarAprendices();
        } else {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: "No se pudo agregar el aprendiz",
          });
        }
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Campos Incompletos",
      text: "Por favor complete todos los campos para insertar el aprendiz",
    });
  }
}
function modalEditarAprendiz(datosAprendiz) {
  const tituloModal = document.getElementById("tituloModal");
  const btnEditar = document.getElementById("btnEditar");
  const btnGuardar = document.getElementById("btnGuardar");

  btnEditar.style.display = "block";
  btnGuardar.style.display = "none";

  btnEditar.setAttribute("data-id", `${datosAprendiz.id_aprendiz}`);

  document.getElementById("nombreAprendiz").value = datosAprendiz.nombre;
  document.getElementById("apellidoAprendiz").value = datosAprendiz.apellido;
  document.getElementById("correoAprendiz").value = datosAprendiz.correo;

  tituloModal.innerHTML = "Editar Aprendiz";
  myModal.toggle();
}

function editarAprendiz() {
  const id_aprendiz = document.getElementById("btnEditar").dataset.id;
  const nombre = document.getElementById("nombreAprendiz").value.trim();
  const apellido = document.getElementById("apellidoAprendiz").value.trim();
  const correo = document.getElementById("correoAprendiz").value.trim();

  if (nombre.length > 0 && apellido.length > 0 && correo.length > 0) {
    fetch(`${url}editarAprendiz/${id_aprendiz}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        apellido: apellido,
        correo: correo,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.resultado.affectedRows === 1) {
          Swal.fire({
            title: "Aprendiz editado con exito",
            icon: "success",
            draggable: true,
          });
          myModal.hide();
          cargarAprendices();
        } else {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error",
            text: "No se pudo editar el aprendiz",
          });
        }
      });
  } else {
    Swal.fire({
      icon: "error",
      title: "Campos Incompletos",
      text: "Por favor complete todos los campos para insertar el aprendiz",
    });
  }
}
