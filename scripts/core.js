
// ======================== //
// DECLARAMOS LAS VARIABLES //
// ======================== //

var articulo;
var pvp;
var cantidad;
var articulosCarrito;
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
var condiciones;
var botonImprimir;
var botonReset;
const cesta = [];


// =========================== //
// CARGA DE JS DESPUES DEL DOM //
// =========================== //

window.addEventListener("load", ()=>{
	
	initVars();
	setListeners();
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

	condiciones = document.getElementById("condiciones");
	botonImprimir = document.getElementById("botonImprimir");	
	botonReset = document.getElementById("botonReset");

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

	botonSumar.addEventListener('click',sumarAlCarrito);
	formaPago.addEventListener('change',opcionesPago);
	botonImprimir.addEventListener('click',imprimirAlert);
	condiciones.addEventListener('click', aceptarCondiciones);
	botonReset.addEventListener('click',resetear);
}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
	var subtotal;
	var subtotal2;
	articulosCarrito.value = "";
	var isChecked = checkValues();	
	if (isChecked) {	
		const articuloObject = new Articulo(articulo.value, pvp.value, cantidad.value);
				
		// Convertimos valor de totalCompra a numero para evitar concatenacion de strings
		subtotal = totalCompra.value*1;
		subtotal2 = parseFloat(articuloObject.pvp*articuloObject.cantidad);		
		// Sumamos subtotal y totales y asignamos valor al campo totalCompra
		totalCompra.value = subtotal + subtotal2;

		// Introducir Articulo en array cesta 		
		cesta.push(articuloObject);		
		
		//Introducimos valores al campo articulos del carrito
		for(var i = 0; i < cesta.length; i++) {
			if(i == (cesta.length - 1) || cesta.length == 1){// esto lo ponemos para que no meta la coma al final de la lista
				articulosCarrito.value = articulosCarrito.value + cesta[i].nombre;
			} else {
				articulosCarrito.value = articulosCarrito.value + cesta[i].nombre + ", ";
			} 
		}				

		// Borramos valores, quitamos warning y devolvemos foco a articulo
		faltaArticulo.style.visibility = "hidden";
		faltaPrecio.style.visibility = "hidden";
		articulo.value = "";
		pvp.value = 0;
		cantidad.value = 1;
		articulo.focus();
	}	
}

function Articulo(nombre, pvp, cantidad){
	this.nombre = nombre;
	this.pvp = pvp;
	this.cantidad = cantidad;
		
	/*articuloObject.nombre = articulo.value;
	articuloObject.pvp = pvp.value;
	articuloObject.cantidad = cantidad.value;*/
}
	
	// Verificamos que se cumplan las condiciones, retornando true si ambas funciones lo son.
function checkValues() {	
	var areChecked = isArticuloNotEmptyAndNaN() && isNotPvpCorrectValue();	
	return areChecked;
}

function isArticuloNotEmptyAndNaN(){
	// Comprobamos que articulo no es nulo y que no es numerico sino 
	// visibilizamos texto de error y reseteamos value y devolvemos foco a articulo
	pattern = /[0-9]/;
	text = articulo.value;
	var isEmptyAndNaN = (text == "" || text.search(pattern) > -1);	
	if (isEmptyAndNaN){
		console.log("articulo mal");
		faltaArticulo.style.visibility = "visible";
		articulo.value = "";
		articulo.focus();
		articulo.style.border.color = "red";
		setTimeout(restoreWarnings, 3000);		
	}
	return !isEmptyAndNaN;
}

function isNotPvpCorrectValue(){
	/* Comprobamos que no es igual a 0 sino  
	visibilizamos texto de error y reseteamos value y devolvemos foco a precio*/
	var isPvpCorrectValue = pvp.value > 0;
	if (!isPvpCorrectValue){
		console.log("precio mal");
		faltaPrecio.style.visibility = "visible";
		pvp.value = 0;
		pvp.focus();
		setTimeout(restoreWarnings, 3000);
	}
	return isPvpCorrectValue;
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

	} else if (formaPago.value == "Tarjeta") {
		efectivoLabel.style.visibility = "hidden";
		efectivo.style.visibility = "hidden";
		titularTarjetaLabel.style.visibility = "visible";
		titularTarjeta.style.visibility = "visible";
		numTarjetaLabel.style.visibility = "visible";
		numTarjeta.style.visibility = "visible";
		numTarjetaCvvLabel.style.visibility = "visible";
		numTarjetaCvv.style.visibility = "visible";
		console.log("soy tarjeta");

	} else {
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

function aceptarCondiciones(){
	if (condiciones.checked){
		botonImprimir.disabled = false;
	} else{
		botonImprimir.disabled = true;
	}
}

function imprimirAlert(){
	if(formaPago.value == "Efectivo" || formaPago.value == "Tarjeta") {
		alert("Los articulos de mi carrito son: " + articulosCarrito.value + " y el precio total es: " + totalCompra.value + " Forma de pago: " + formaPago.value);
	} else {
		alert("Seleccione una forma de pago");
	}
}

function resetear(){
	articulo.value = "";	
	pvp.value = "0";
	cantidad.value = "1";
	articulosCarrito.value = "";
	totalCompra.value = "";	
	formaPago.value = "";	
	efectivo.value = "";
	titularTarjeta.value = "";	
	numTarjeta.value = "";
	numTarjetaCvv.value = "";	
	ticket.value = "";
	condiciones.checked = false;
	botonImprimir.disabled = true;
	formaPago.selectedIndex = 0;
	
	cesta.length = 0;	
	articulo.focus();
}
