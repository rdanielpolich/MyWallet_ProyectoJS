class Registro {
  constructor(id, fecha, nombre, monto, tipo) {
    this.id = id;
    this.fecha = fecha;
    this.nombre = nombre;
    this.monto = monto;
    this.tipo = tipo;
  }
}

let registrosIngreso =
  JSON.parse(localStorage.getItem("registrosIngreso")) || [];
let registrosEgreso = JSON.parse(localStorage.getItem("registrosEgreso")) || [];
let tableBody = document.querySelector("#table_body");
let tableBody1 = document.querySelector("#table_body1");

let myModal = new bootstrap.Modal(document.getElementById("myModal"));
let myModal1 = new bootstrap.Modal(document.getElementById("myModal"));

function agregarRegistros(e) {
  e.preventDefault();

  let id = new Date().getTime();
  let fecha = document.getElementById("text_fecha").value;
  let nombre = document.getElementById("text_nombre").value;
  let monto = document.getElementById("text_monto").value;
  let tipo = document.getElementById("tipo").value;

  if (monto < 0) {
    return alert("El monto ingresado es inválido");
  }

  if (tipo === "Ingreso") {
    registrosIngreso.push(new Registro(id, fecha, nombre, monto, tipo));
    localStorage.setItem("registrosIngreso", JSON.stringify(registrosIngreso));
    cargarTabla();
    document.getElementById("formulario_ingreso").reset();
    document.getElementById("text_nombre").focus();
  } else {
    registrosEgreso.push(new Registro(id, fecha, nombre, monto, tipo));
    localStorage.setItem("registrosEgreso", JSON.stringify(registrosEgreso));
    cargarTabla1();
    document.getElementById("formulario_ingreso").reset();
    document.getElementById("text_nombre").focus();
  }
}

const editModal = function (registroId) {
  myModal.show();
  crearCuerpoModal(registroId);
};

const editModal1 = function (registroId) {
  myModal1.show();
  crearCuerpoModal1(registroId);
};

const crearCuerpoModal = (index) => {
  document.querySelector(".modal-body1").innerHTML = "";

  let bodyModal = document.querySelector(".modal-body1");
  let contenidoBody = `<form id="form-update" onSubmit="actualizarIngreso(event,${index})">
  <label class="fw-bold">Descripcion</label>
  <input
    type="text"
    value="${registrosIngreso[index].nombre}"
    class="form-control"
    id="nombre-update"
    required
  />
  <label class="fw-bold">Monto</label>
  <input
    type="number"
    value="$${registrosIngreso[index].monto}"
    class="form-control"
    id="monto-update"
    required
  />
  <label class="fw-bold">Fecha</label>
  <input
    type="date"
    class="form-control"
    value="${registrosIngreso[index].fecha}"
    id="fecha-update"
    required
  />
   
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-dismiss="modal"
  >
    Cancelar
  </button>
  <button type="submit" class="btn btn-success float-end">
    Actualizar
  </button>
</form>`;

  bodyModal.innerHTML = contenidoBody;
};

const crearCuerpoModal1 = (index) => {
  document.querySelector(".modal-body1").innerHTML = "";

  let bodyModal1 = document.querySelector(".modal-body1");
  let contenidoBody1 = `<form id="form-update" onSubmit="actualizarEgreso(event,${index})">
  <label class="fw-bold">Descripcion</label>
  <input
    type="text"
    value="${registrosEgreso[index].nombre}"
    class="form-control"
    id="nombre-update"
    required
  />
  <label class="fw-bold">Monto</label>
  <input
    type="number"
    value="$${registrosEgreso[index].monto}"
    class="form-control"
    id="monto-update"
    required
  />
  <label class="fw-bold">Fecha</label>
  <input
    type="date"
    class="form-control"
    value="${registrosEgreso[index].fecha}"
    id="fecha-update"
    required
  />
   
  <button
    type="button"
    class="btn btn-secondary"
    data-bs-dismiss="modal"
  >
    Cancelar
  </button>
  <button type="submit" class="btn btn-success float-end">
    Actualizar
  </button>
</form>`;

  bodyModal1.innerHTML = contenidoBody1;
};

const actualizarIngreso = function (e, index) {
  e.preventDefault();
  // console.log(index);

  let fecha = document.getElementById("fecha-update").value;
  console.log(fecha);
  let nombre = document.getElementById("nombre-update").value;
  console.log(nombre);
  let monto = document.getElementById("monto-update").value;
  console.log(monto);

  const newData = {
    fecha,
    nombre,
    monto,
  };
  registrosIngreso.splice(index, 1, newData);
  localStorage.setItem("registrosIngreso", JSON.stringify(registrosIngreso));
  myModal.hide();
  cargarTabla();
};

const actualizarEgreso = function (e, index) {
  e.preventDefault();
  // console.log(index);

  let fecha = document.getElementById("fecha-update").value;
  console.log(fecha);
  let nombre = document.getElementById("nombre-update").value;
  console.log(nombre);
  let monto = document.getElementById("monto-update").value;
  console.log(monto);

  const newData = {
    fecha,
    nombre,
    monto,
  };
  registrosEgreso.splice(index, 1, newData);
  localStorage.setItem("registrosEgreso", JSON.stringify(registrosEgreso));
  myModal.hide();
  cargarTabla1();
};

const borrarIngreso = (registroId) => {
  let validar = confirm(
    `Está seguro que desea eliminar el registro ${registrosIngreso[registroId].nombre}?`
  );

  if (validar) {
    registrosIngreso.splice(registroId, 1);
    localStorage.setItem("registrosIngreso", JSON.stringify(registrosIngreso));
    alert("Registro eliminado");
    cargarTabla();
  }
};

const borrarEgreso = (registroId) => {
  let validar = confirm(
    `Está seguro que desea eliminar el registro ${registrosEgreso[registroId].nombre}?`
  );

  if (validar) {
    registrosEgreso.splice(registroId, 1);
    localStorage.setItem("registrosEgreso", JSON.stringify(registrosEgreso));
    alert("Registro eliminado");
    cargarTabla1();
  }
};

const cargarTabla = () => {
  tableBody.innerHTML = "";
  registrosIngreso.map(function (registro, index) {
    let tr = document.createElement("tr");
    tr.classList = "table-success";
    let celda = `<th scope="row">${registro.fecha}</th>
            <td class="tabla-responsive1">${registro.nombre}</td>
            <td>$${registro.monto}</td>
            <td><div class="tabla-responsive">
            <button class="btn btn-primary btn-sm" onclick="editModal(${index})"><i class="fas fa-pencil-alt"></i></button>
            <button class="btn btn-dark btn-sm" onClick="borrarIngreso(${index})"
            ><i class="fas fa-trash-alt"></i></button>
          </div>
            </td>
              
            `;

    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

const cargarTabla1 = () => {
  tableBody1.innerHTML = "";
  registrosEgreso.map(function (registro, index) {
    let tr1 = document.createElement("tr");
    tr1.classList = "table-danger";
    let celda = `<th class="tabla-responsive1" scope="row">${registro.fecha}</th>
        <td >${registro.nombre}</td>
        <td>$${registro.monto}</td>
        <td> <div class="tabla-responsive">
        <button class="btn btn-primary btn-sm" onclick="editModal1(${index})" ><i class="fas fa-pencil-alt"></i></button>
        <button class="btn btn-dark btn-sm"  onClick="borrarEgreso(${index})" ><i class="fas fa-trash-alt"></i></button>
      </div>
</td>
         
        `;

    tr1.innerHTML = celda;
    tableBody1.appendChild(tr1);
    cargarTabla();
  });
};

document
  .getElementById("formulario_ingreso")
  .addEventListener("submit", agregarRegistros);

cargarTabla();
cargarTabla1();
