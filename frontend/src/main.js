import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// app.js
import { getUsers, getPosts } from "./api.js";
import { renderUserList, renderPostList } from "./ui.js";

async function init() {
  try {
    const users = await getUsers();
    const posts = await getPosts();
    console.log(posts);

    renderUserList(users);
    renderPostList(posts);
  } catch (error) {
    // Manejo de errores (mostrando un mensaje al usuario, por ejemplo)
    console.error("Error en la inicialización:", error);
    const errorElement = document.getElementById("errorContainer");
    errorElement.textContent = "Hubo un problema al cargar los datos.";
    errorElement.style.display = "block";
  }
}

init(); // Llama a la función de inicialización