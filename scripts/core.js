
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
var count = 0;
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
	botonReset = document.getElementById("botonReset");
	botonImprimir = document.getElementById("botonImprimir");
	condiciones = document.getElementById("condiciones");

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
		count+=1;
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

function Articulo(nombre, pvp, cantidad){
	this.nombre = nombre;
	this.pvp = pvp;
	this.cantidad = cantidad;
		
}
	
// Verificamos que se cumplan las condiciones, retornando true si ambas funciones lo son.
function checkValues() {	
	var areChecked = isArticuloNotEmptyAndNaN() && isNotPvpCorrectValue();	
	return areChecked;
}

// Comprobamos que articulo no es nulo y que no es numerico sino 
// visibilizamos texto de error y reseteamos value y devolvemos foco a articulo
function isArticuloNotEmptyAndNaN(){


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

/* Comprobamos que no es igual a 0 sino  
visibilizamos texto de error y reseteamos value y devolvemos foco a precio*/
function isNotPvpCorrectValue(){


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

// Quitamos avisos de warnings
function restoreWarnings(){
 
	
	faltaArticulo.style.visibility = "hidden";
	faltaPrecio.style.visibility = "hidden";

}

// Ocultamos o mostramos en funcion del medio de pago elegido, tambien se puede hacer con un "switch"
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

	} else if (formaPago.value == "Tarjeta") {
		efectivoLabel.style.visibility = "hidden";
		efectivo.style.visibility = "hidden";
		titularTarjetaLabel.style.visibility = "visible";
		titularTarjeta.style.visibility = "visible";
		numTarjetaLabel.style.visibility = "visible";
		numTarjeta.style.visibility = "visible";
		numTarjetaCvvLabel.style.visibility = "visible";
		numTarjetaCvv.style.visibility = "visible";

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

// Comprobamos si el check es true para activar el boton de imprimir
function aceptarCondiciones(){
	if (condiciones.checked){
		botonImprimir.disabled = false;
	} else{
		botonImprimir.disabled = true;
	}
}

// Comprobamos si hay un medio de pago valido sino devolvemos dialogo de alert
function imprimirAlert(){
	if(formaPago.value == "Efectivo" || formaPago.value == "Tarjeta") {
		alert("Los articulos de mi carrito son: " + articulosCarrito.value + " y el precio total es: " + totalCompra.value + " Forma de pago: " + formaPago.value);
	} else {
		alert("Seleccione una forma de pago");
	}
}

// Ocultamos o mostramos en funcion del medio de pago elegido, tambien se puede hacer con un "switch"
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
	condiciones.checked = false;
	botonImprimir.disabled = true;
	formaPago.selectedIndex = 0;
	cesta.length = 0;	
	articulo.focus();
}

