let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

class Usuario {
  constructor(nombre, email, password) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
  }
}

const registroUsuario = function (e) {
  e.preventDefault();

  let nombre = document.getElementById("text_nombre").value;
  let correo = document.getElementById("text_email").value;
  let password = document.getElementById("text_password").value;
  let password2 = document.getElementById("text_password2").value;

  if (password !== password2) {
    return alert("Las contraseñas no coinciden, intente de nuevo");
  }

  let validar = usuarios.find((user) => {
    return user.email === correo;
  });

  if (validar) {
    return alert(
      "Ya existe una cuenta vinculada a ese correo electrónico, ingrese con sus credenciales"
    );
  }

  usuarios.push(new Usuario(nombre, correo, password));
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("formulario").reset();
  alert("Te has registrado con éxito");

  location.replace("../index.html");
};

document
  .getElementById("formulario")
  .addEventListener("submit", registroUsuario);
