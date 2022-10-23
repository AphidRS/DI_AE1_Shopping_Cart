
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
var botonImprimir;
var condiciones;
var count = 0;
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

	// BOTONES Y CHECKBOX
	botonSumar = document.getElementById("botonSumar");
	botonImprimir = document.getElementById("botonImprimir");
	condiciones = document.getElementById("condiciones");

}

// ====================== //
// LANZAMOS LOS LISTENERS //
// ====================== //

function setListeners() {

	botonSumar.addEventListener('click',sumarAlCarrito());
	formaPago.addEventListener('change',opcionesPago());
	condiciones.addEventListener('change',condicionesOk());
	botonImprimir.addEventListener('click', imprimir());
}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
	var subtotal;
	var subtotal2;

	if (checkValues()){

		count+=1;
		// Convertimos valor de totalCompra a numero para evitar concatenacion de strings
		subtotal = totalCompra.value*1;
		subtotal2 = parseInt(pvp.value*cantidad.value);

		// Introducimos art. en array cesta 
		cesta.push(articulo.value,cantidad.value,pvp.value);
	
		// Sumamos subtotal y totales y asignamos valor al campo totalCompra
		totalCompra.value = subtotal + subtotal2;
		articulosCarrito.value = cesta;

		// Creamos objetos TR y TD para popular la tabla ticket, usamos un contador
		var line = document.createElement("tr");
		var field1 = document.createElement("td");
		var field2 = document.createElement("td");
		var field3 = document.createElement("td");
		line.id = "id" + count;
		field1.id = "id" + count;
		count+=1;
		field2.id = "id" + count;
		count+=1;
		field3.id = "id" + count;
		field1.innerHTML = articulo.value;
		field2.innerHTML = cantidad.value;
		field3.innerHTML = pvp.value;
		document.getElementById("tabla").append(line);
		document.getElementById(line.id).append(field1);
		document.getElementById(line.id).append(field2);
		document.getElementById(line.id).append(field3);

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

		// Definomos patron numerico no admitido en el campo articulo
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
		// visibilizamos texto de error y reseteamos value y devolvemos foco a precio
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
 
	// Quitamos avisos de warnings
	faltaArticulo.style.visibility = "hidden";
	faltaPrecio.style.visibility = "hidden";

}

function opcionesPago (){

	// Ocultamos o mostramos en funcion del medio de pago elegido, tambien se puede hacer con un "switch"
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

function condicionesOk() {

	// Mostramos u ocultamos el boton imprimir si las condiciones estan checked
	if (condiciones.checked == true) {

		botonImprimir.style.visibility = "visible";

	} else {

		botonImprimir.style.visibility = "hidden";
	}
}

function imprimir() {

	// Dialogo final con los datos de la compra
	alert("Los articulos de mi carrito son : "+ cesta +" y el precio total es: " + totalCompra.value + " Forma de pago: " + formaPago.value)

}