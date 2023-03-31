let registrosIngreso =
  JSON.parse(localStorage.getItem("registrosIngreso")) || [];
let registrosEgreso = JSON.parse(localStorage.getItem("registrosEgreso")) || [];
let tableBody = document.querySelector("#table_body");
let tableBody1 = document.querySelector("#table_body1");
let containerBalance = document.getElementById("container_balance");
let containerIngreso = document.getElementById("container_ingreso");
let containerEgreso = document.getElementById("container_egreso");

const sumaIngreso = registrosIngreso
  .map((Registro) => Number(Registro.monto))
  .reduce((prev, curr) => prev + curr, 0);
console.log(sumaIngreso);

const sumaEgreso = registrosEgreso
  .map((Registro) => Number(Registro.monto))
  .reduce((prev, curr) => prev + curr, 0);
console.log(sumaEgreso);

const balanceTotal = sumaIngreso - sumaEgreso;
console.log(balanceTotal);

const cargarIngreso = () => {
  containerIngreso.innerHTML = "";
  let TotalIngresos = sumaIngreso;
  let div = document.createElement("div");
  div.classList = "card-body";
  let contenidoCard = `<div class="card w-100 bg-success text-center text-white" style="width: 18rem;">
  <div class="justify-content-center">  <img src="../assets/ingreso.png" class=" img" alt="...">
  </div>
  <div class="card-body">
    <p class="card-title">Total de Ingresos</p>
    <p class="card-text">$${TotalIngresos}</p>
   </div>
</div>`;
  div.innerHTML = contenidoCard;
  containerIngreso.appendChild(div);
};

const cargarEgreso = () => {
  containerEgreso.innerHTML = "";
  let TotalEgresos = sumaEgreso;
  let div = document.createElement("div");
  div.classList = "card-body";
  let contenidoCard = `<div class="card w-100 bg-danger text-center text-white" style="width: 18rem;">
  <div class="justify-content-center">  <img src="../assets/egreso.png" class="img" alt="...">
  </div>
    <div class="card-body">
      <p class="card-title">Total de Egresos</p>
      <p class="card-text">$${TotalEgresos}</p>
     </div>
  </div>`;
  div.innerHTML = contenidoCard;
  containerEgreso.appendChild(div);
};

const cargarBalance = () => {
  containerBalance.innerHTML = "";
  let TotalBalance = sumaIngreso - sumaEgreso;
  let div = document.createElement("div");
  div.classList = "card-body";
  let contenidoCard = `<div class="card w-100 bg-warning text-center text-white" style="width: 18rem;">
  <div class="justify-content-center">  <img src="../assets/balance.png" class="img" alt="...">
  </div>
      <div class="card-body">
        <p class="card-title">Balance Total</p>
        <p class="card-text">$${TotalBalance}</p>
       </div>
    </div>`;
  div.innerHTML = contenidoCard;
  containerBalance.appendChild(div);
};

const cargarTabla = () => {
  tableBody.innerHTML = "";
  registrosIngreso.map(function (registro) {
    let tr = document.createElement("tr");
    tr.classList = "table-success";
    let celda = `<th scope="row">${registro.fecha}</th>
              <td>${registro.nombre}</td>
              <td>$${registro.monto}</td>`;

    tr.innerHTML = celda;
    tableBody.appendChild(tr);
  });
};

const cargarTabla1 = () => {
  tableBody1.innerHTML = "";
  registrosEgreso.map(function (registro) {
    let tr1 = document.createElement("tr");
    tr1.classList = "table-danger";
    let celda = `<th scope="row">${registro.fecha}</th>
          <td>${registro.nombre}</td>
          <td>$${registro.monto}
          </td>`;

    tr1.innerHTML = celda;
    tableBody1.appendChild(tr1);
    cargarTabla();
  });
};

cargarTabla();
cargarTabla1();
cargarBalance();
cargarIngreso();
cargarEgreso();
