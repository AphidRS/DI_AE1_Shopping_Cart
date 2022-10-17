
// ======================== //
// DECLARAMOS LAS VARIABLES //
// ======================== //

var articulo;
var pvp;
var cantidad;
var totalCompra;
var botonSumar;
var faltaArticulo;
var faltaPrecio;
var ticket;
const cesta = [];

// =========================== //
// CARGA DE JS DESPUES DEL DOM //
// =========================== //

window.addEventListener("load", ()=>{
	
	initVars();

});

// =========================== //
// INICIALIZAMOS LAS VARIABLES //
// =========================== //

function initVars() {

	articulo = document.getElementById("articulo");
	faltaArticulo = document.getElementById("faltaArticulo");
	pvp = document.getElementById("pvp");
	faltaPrecio = document.getElementById("faltaPrecio");
	cantidad = document.getElementById("cantidad");
	totalCompra = document.getElementById("totalCompra");
	articulosCarrito = document.getElementById("articulosCarrito");
	ticket = document.getElementById("ticket");
	botonSumar = document.getElementById("botonSumar");
	articulo.focus();

}

// ====================== //
// LANZAMOS LOS LISTENERS //
// ====================== //

function setListeners() {

	botonSumar.addEventListener('click',sumarAlCarrito());
	articulo.addEventListener('change',checkValues());
	pvp.addEventListener('change',checkValues());

}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
	var subtotal;
	var subtotal2
	/*checkValues();*/
	if (checkValues()){

		// Convertimos valor de totalCompra a numero para evitar concatenacion de strings
		subtotal = totalCompra.value*1;
		subtotal2 = parseInt(pvp.value*cantidad.value);

		// Iteracion para introducir art. en array cesta 
		for (var i = 0; i < cantidad.value; i++) {
			cesta.push(articulo.value);
		}
		// Sumamos subtotal y totales y asignamos valor al campo totalCompra
		totalCompra.value = subtotal + subtotal2;
		articulosCarrito.value = cesta;
		ticket.innerText = cesta;

		// Borramos valores, quitamos warning y devolvemos foco a articulo
		faltaArticulo.style.visibility = "hidden";
		faltaPrecio.style.visibility = "hidden";
		articulo.value = "";
		pvp.value = 0;
		cantidad.value = 1;
		articulo.focus();
	} 
}


function checkValues() {
		pattern = /[0-9]/;
		text = articulo.value;

		// Comprobamos que articulo no es nulo y que no es numerico sino 
		// visibilizamos texto de error y reseteamos value y devolvemos foco a articulo
		if (articulo.value == "" || text.search(pattern) == 0){
			console.log("articulo mal");
			faltaArticulo.style.visibility = "visible";
			articulo.value = "";
			articulo.focus();
			articulo.style.border.color = "red";
			setTimeout(restoreWarnings, 3000);
			return false;
		}

		// Comprobamos que no es igual a 0 sino  
		// vvisibilizamos texto de error y reseteamos value y devolvemos foco a precio
		if (pvp.value == 0 ){
			console.log("precio mal");
			faltaPrecio.style.visibility = "visible";
			pvp.value = 0;
			pvp.focus();
			setTimeout(restoreWarnings, 3000);
			return false;

		}
	return true;
}

function restoreWarnings(){

	faltaArticulo.style.visibility = "hidden";
	faltaPrecio.style.visibility = "hidden";

}

