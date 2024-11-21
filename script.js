 
const inputName = document.getElementById("name");
const inputLastname = document.getElementById("lastname");
const inputNumberPhone = document.getElementById("NumberPhone");
const inputEmail = document.getElementById("email");
const selectEtiqueta = document.getElementById("etiqueta");
const infoMostrar = document.getElementById("Tbody"); //tbody del html
const BtnSaveContact = document.getElementById("Btn"); //boton de guardar contactos

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
    if (txtName === "" || txtLastname === "" || txtEmail === "" || txtEtiqueta === "") {
      alert("Por favor, complete todos los campos");
    } else if (txtEtiqueta === "") { // Validar que se haya seleccionado una etiqueta válida
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
       

      } else {
        alert("El número de teléfono ya existe");
      }
    }
  }

//funcion para mostrar los datos en la tabla 


  
// funcion para verificar si el numeo ya existe en la lista de contactos
function isNumberPhoneUnique(number) {
    return !infoContact.some((user) => user.NumberPhone === number);
  }
   // funcion para limpiar los campos de entrada
  function clearImputs(){
      inputName.value = '';
      inputLastname.value = '';
      inputNumberPhone.value = '';
      inputEmail.value = '';
      selectEtiqueta.value = '';
   }
   
});
