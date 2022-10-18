
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
var formaPago;
var efectivoLabel;
var efectivo;
var titularTarjeta;
var titularTarjetaLabel;
var numTarjeta;
var numTarjetaCvv;
var numTarjetaLabel;
var numTarjetaCvvLabel;
var ticket;
const cesta = [];

// =========================== //
// CARGA DE JS DESPUES DEL DOM //
// =========================== //

window.addEventListener("load", ()=>{
	
	initVars();

});

// ============================ //
// ASIGNACION VARIABLES DEL DOM //
// ============================ //

function initVars() {

	// COMPRA
	articulo = document.getElementById("articulo");
	pvp = document.getElementById("pvp");
	cantidad = document.getElementById("cantidad");
	totalCompra = document.getElementById("totalCompra");
	articulosCarrito = document.getElementById("articulosCarrito");
	ticket = document.getElementById("ticket");
	botonSumar = document.getElementById("botonSumar");


	// FORMAS DE PAGO
	formaPago = document.getElementById("formaPago");

	efectivo = document.getElementById("efectivo");

	titularTarjeta = document.getElementById("titularTarjeta");
	numTarjeta = document.getElementById("numTarjeta");
	numTarjetaCvv = document.getElementById("numTarjetaCvv");

	efectivoLabel = document.getElementById("efectivoLabel");
	titularTarjetaLabel = document.getElementById("titularTarjetaLabel");
	numTarjetaLabel = document.getElementById("numTarjetaLabel");
	numTarjetaCvvLabel = document.getElementById("numTarjetaCvvLabel");

	// WARNINGS
	faltaPrecio = document.getElementById("faltaPrecio");
	faltaArticulo = document.getElementById("faltaArticulo");
	faltaTarjeta = document.getElementById("faltaTarjeta");
	faltaNumTarjeta = document.getElementById("faltaNumTarjeta");
	faltaCvv = document.getElementById("faltaCvv");
	articulo.focus();

}

// ====================== //
// LANZAMOS LOS LISTENERS //
// ====================== //

function setListeners() {

	botonSumar.addEventListener('click',sumarAlCarrito());
	formaPago.addEventListener('change',opcionesPago());

}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
	var subtotal;
	var subtotal2
	if (checkValues()){

		// Convertimos valor de totalCompra a numero para evitar concatenacion de strings
		subtotal = totalCompra.value*1;
		subtotal2 = parseInt(pvp.value*cantidad.value);

		// Iteracion para introducir art. en array cesta 
		for (var i = 0; i < cantidad.value; i++) {
			cesta.push(articulo.value,cantidad.value,pvp.value);
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

function opcionesPago (){

	if (formaPago.value == "Efectivo") {

		titularTarjetaLabel.style.visibility = "hidden";
		titularTarjeta.style.visibility = "hidden";
		numTarjetaLabel.style.visibility = "hidden";
		numTarjeta.style.visibility = "hidden";
		numTarjetaCvvLabel.style.visibility = "hidden";
		numTarjetaCvv.style.visibility = "hidden";
		efectivoLabel.style.visibility = "visible";
		efectivo.style.visibility = "visible";
		efectivo.value = totalCompra.value;
		console.log("soy efectivo");

	} 

	if (formaPago.value == "Tarjeta") {

		efectivoLabel.style.visibility = "hidden";
		efectivo.style.visibility = "hidden";
		titularTarjetaLabel.style.visibility = "visible";
		titularTarjeta.style.visibility = "visible";
		numTarjetaLabel.style.visibility = "visible";
		numTarjeta.style.visibility = "visible";
		numTarjetaCvvLabel.style.visibility = "visible";
		numTarjetaCvv.style.visibility = "visible";
		console.log("soy tarjeta");

	}

	if (formaPago.value == "default") {

		titularTarjetaLabel.style.visibility = "hidden";
		titularTarjeta.style.visibility = "hidden";
		numTarjetaLabel.style.visibility = "hidden";
		numTarjeta.style.visibility = "hidden";
		numTarjetaCvvLabel.style.visibility = "hidden";
		numTarjetaCvv.style.visibility = "hidden";
		efectivoLabel.style.visibility = "hidden";
		efectivo.style.visibility = "hidden";
	}

}