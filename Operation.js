// Función para validar el formulario
function ValidateForm() {
    const email = document.getElementById("inputEmail").value.trim();
    const name = document.getElementById("inputName").value.trim();
    const phone = document.getElementById("inputPhone").value.trim();
    const key = document.getElementById("inputKey").value.trim(); 
    const amount = document.getElementById("inputAmount").value.trim();
  
    if (email === "" ||!email.includes("@")) {
      alert("El campo email es requerido o no es válido");
      return false;
    }
  
    if (name === "") {
      alert("El campo nombre es requerido");
      return false;
    }
  
    if (phone === "") {
      alert("El campo teléfono es requerido");
      return false;
    }
  
    if (key === "") {
      alert("El campo clave es requerido");
      return false;
    }
  
    if (amount === "" || isNaN(amount)) {
      alert("El campo monto es requerido y debe ser un número");
      return false;
    }
  
    return true;
  }
  
  // Función para leer datos desde localStorage y mostrarlos en la tabla
  function ReadData() {
    let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
  
    let html = listPeople.map((person, index) => `
      <tr>
        <td>${person.key}</td> <!-- Nuevo campo -->
        <td>${person.amount}</td> <!-- Nuevo campo -->
        <td>${person.email}</td>
        <td>${person.name}</td>
        <td>${person.phone}</td>
        <td>
          <button onclick="deleteData(${index})" class="btn btn-danger">Eliminar Datos</button>
          <button onclick="editData(${index})" class="btn btn-warning">Editar Datos</button>
        </td>
      </tr>`).join('');
  
    document.querySelector("#tableData").innerHTML = html;
  }
  
  // Función para agregar datos al localStorage
  function Adddata() {
    if (ValidateForm()) {
      const email = document.getElementById("inputEmail").value.trim();
      const name = document.getElementById("inputName").value.trim();
      const phone = document.getElementById("inputPhone").value.trim();
      const key = document.getElementById("inputKey").value.trim(); // Nuevo campo
      const amount = document.getElementById("inputAmount").value.trim(); // Nuevo campo
  
      let listPeople = JSON.parse(localStorage.getItem("listPeople")) || [];
  
      listPeople.push({ key, amount, email, name, phone });
  
      localStorage.setItem("listPeople", JSON.stringify(listPeople));
  
      // Limpiar campos del formulario
      document.getElementById("inputEmail").value = '';
      document.getElementById("inputName").value = '';
      document.getElementById("inputPhone").value = '';
      document.getElementById("inputKey").value = ''; // Limpieza del nuevo campo
      document.getElementById("inputAmount").value = ''; // Limpieza del nuevo campo
  
      ReadData(); // Actualizar la tabla con los nuevos datos
    }
  }
  
  // Funciones para eliminar y editar datos
  function deleteData(index) {
    let listPeople = JSON.parse(localStorage.getItem("listPeople"));
    listPeople.splice(index, 1);
    localStorage.setItem("listPeople", JSON.stringify(listPeople));
    ReadData();
  }
  
  function editData(index) {
    let listPeople = JSON.parse(localStorage.getItem("listPeople"));
  
    document.getElementById("inputEmail").value = listPeople[index].email;
    document.getElementById("inputName").value = listPeople[index].name;
    document.getElementById("inputPhone").value = listPeople[index].phone;
    document.getElementById("inputKey").value = listPeople[index].key; 
    document.getElementById("inputAmount").value = listPeople[index].amount;
  
    document.getElementById("btnAdd").style.display = "none"; 
    document.getElementById("btnUpdate").style.display = "inline-block"; 
  
    document.querySelector("#btnUpdate").onclick = function () {
      if (ValidateForm()) {
        listPeople[index] = { email: document.getElementById("inputEmail").value.trim(), name: document.getElementById("inputName").value.trim(), phone: document.getElementById("inputPhone").value.trim(), key: document.getElementById("inputKey").value.trim(), amount: document.getElementById("inputAmount").value.trim() }; // Incluir los nuevos campos
  
        localStorage.setItem("listPeople", JSON.stringify(listPeople));
        ReadData();
  
        document.getElementById("inputEmail").value = '';
        document.getElementById("inputName").value = '';
        document.getElementById("inputPhone").value = '';
        document.getElementById("inputKey").value = ''; // Limpieza del nuevo campo
        document.getElementById("inputAmount").value = ''; // Limpieza del nuevo campo
  
        document.getElementById("btnAdd").style.display = "inline-block"; // Mostrar el botón de agregar nuevamente
        document.getElementById("btnUpdate").style.display = "none"; // Ocultar el botón de actualizar
      }
    };
  }
  
  // Asegúrate de llamar a ReadData cuando se cargue la página
  document.addEventListener("DOMContentLoaded", ReadData);
  