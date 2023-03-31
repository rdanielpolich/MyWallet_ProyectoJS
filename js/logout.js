const cerrarSesion = () => {
  localStorage.removeItem("user");
  location.replace("../index.html");
};
