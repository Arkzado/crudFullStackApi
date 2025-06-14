const BASE_URL = "https://jsonplaceholder.typicode.com";

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-tira el error para que el llamador pueda manejarlo
  }
}

async function getUsers() {
  return await fetchData("/users");
}

async function getPosts() {
  return await fetchData("/posts");
}

export { getUsers, getPosts };

function renderUserList(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = ""; // Limpiar la lista antes de renderizar

  users.forEach((user) => {
    const listItem = document.createElement("li");
      listItem.textContent = user.name;
      listItem.classList.add("alert",  "alert-primary");
    userList.appendChild(listItem);
  });
}

function renderPostList(posts) {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post) => {
      const listItem = document.createElement("li");

      listItem.textContent = post.title;
      listItem.classList.add("alert",  "alert-success");
      postList.appendChild(listItem);
    
  });
}

export { renderUserList, renderPostList };
