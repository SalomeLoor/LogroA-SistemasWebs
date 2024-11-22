const inputName = document.getElementById("name");
const inputLastname = document.getElementById("lastname");
const inputNumberPhone = document.getElementById("NumberPhone");
const inputEmail = document.getElementById("email");
const selectEtiqueta = document.getElementById("etiqueta");
const infoMostrar = document.getElementById("Tbody"); //tbody del html
const BtnSaveContact = document.getElementById("Btn"); //boton de guardar contactos
const inputBuscar = document.getElementById("buscar"); //input de buscar contactos

document.addEventListener("DOMContentLoaded", () => {
  let infoContact = JSON.parse(localStorage.getItem("contact")) || [];
  BtnSaveContact.addEventListener("click", infoSave);

  // sirve para mostrar los datos al cargar la página
  window.onload = mostrarInfo;

  //funcion de guardar datos
  function infoSave() {
    let txtName = inputName.value;
    let txtLastname = inputLastname.value;
    let txtNumberPhone = inputNumberPhone.value;
    let txtEmail = inputEmail.value;
    let txtEtiqueta = selectEtiqueta.value;

    // Validación de los campos que no estén vacíos
    if (
      txtName === "" ||
      txtLastname === "" ||
      txtEmail === "" ||
      txtEtiqueta === ""
    ) {
      alert("Por favor, complete todos los campos");
    } else if (txtEtiqueta === "") {
      // Validar que se haya seleccionado una etiqueta válida
      alert("Por favor, seleccione una etiqueta");
    } else {
      if (isNumberPhoneUnique(txtNumberPhone)) {
        let ContactObject = {
          name: txtName,
          lastname: txtLastname,
          NumberPhone: txtNumberPhone,
          email: txtEmail,
          etiqueta: txtEtiqueta,
        };

        if (BtnSaveContact.hasAttribute("data-index")) {
          const index = BtnSaveContact.getAttribute("data-index");
          infoContact[index] = ContactObject;
          BtnSaveContact.removeAttribute("data-index");
        } else {
          infoContact.push(ContactObject);
        }
        // Se guardan la información en el localStorage
        localStorage.setItem("contact", JSON.stringify(infoContact));
        clearImputs();
        alert("Contacto agregado con éxito");
        mostrarInfo();
      } else {
        alert("El número de teléfono ya existe");
      }
    }
  }

  //funcion para mostrar los datos en la tabla
  function mostrarInfo() {
    infoMostrar.innerHTML = "";
    console.log("contacto guardado : " + infoContact);

    infoContact.forEach((c, index) => {
      infoMostrar.innerHTML += `
        <tr>
          <td>${c.name}</td>
          <td>${c.lastname}</td>
          <td>${c.NumberPhone}</td>
          <td>${c.email}</td>
          <td>${c.etiqueta}</td>
          <td><button class="editar" data-index="${index}">📝</button></td>
          <td><button class="eliminar" data-index="${index}">🗑️</button></td>
        </tr>`;
    });
  }

  // funcion para verificar si el numeo ya existe en la lista de contactos
  function isNumberPhoneUnique(number) {
    return !infoContact.some((user) => user.NumberPhone === number);
  }
  // funcion para limpiar los campos de entrada
  function clearImputs() {
    inputName.value = "";
    inputLastname.value = "";
    inputNumberPhone.value = "";
    inputEmail.value = "";
    selectEtiqueta.value = "";
  }

  infoMostrar.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("editar")) {
      const index = e.target.getAttribute("data-index");
      EditContact(index);
    }
    if (e.target && e.target.classList.contains("eliminar")) {
      const index = e.target.getAttribute("data-index");
      deleteContact(index);
    }
  });

  //funcion para editar un contacto
  function EditContact(index) {
    let contactToEdit = infoContact[index];

    // Llenar los campos con la información del usuario
    inputName.value = contactToEdit.name;
    inputLastname.value = contactToEdit.lastname;
    inputNumberPhone.value = contactToEdit.NumberPhone;
    inputEmail.value = contactToEdit.email;
    selectEtiqueta.value = contactToEdit.etiqueta;

    // Guardar el índice en un atributo data para saber qué usuario estamos editando
    BtnSaveContact.setAttribute("data-index", index);
  }

  // funcion para eliminar un contacto
  function deleteContact(index) {
    console.log("index a eliminar :" + index);
    infoContact.splice(index, 1);
    localStorage.setItem("contact", JSON.stringify(infoContact));
    // Volver a mostrar los datos
    mostrarInfo();
  }

  
//activa la busqued en tiempo real
inputBuscar.addEventListener("input", searchContact);

// Función para buscar un contacto por nombre o etiqueta
function searchContact() {

  let txtsearch = inputBuscar.value.toLowerCase().trim();

  if (txtsearch !== "") {
    let resulContacts = infoContact.filter(contact =>
      contact.name.toLowerCase().includes(txtsearch) || 
      contact.etiqueta.toLowerCase().includes(txtsearch) 
    );

    UpdateTable(resulContacts);
  } else {
    UpdateTable(infoContact);
  }
}

// Función para actualizar la tabla
function UpdateTable(contacts) {
  infoMostrar.innerHTML = "";
  if (contacts.length === 0) {
      infoMostrar.innerHTML = `
      <tr>
        <td colspan="5">No se encontraron resultados</td>
      </tr>`;
    return;
  }
  contacts.forEach(contact => {
    infoMostrar.innerHTML += `
      <tr>
        <td>${contact.name}</td>
        <td>${contact.lastname}</td>
        <td>${contact.NumberPhone}</td>
        <td>${contact.email}</td>
        <td>${contact.etiqueta}</td>
      </tr>`;
  });
}
  

});
