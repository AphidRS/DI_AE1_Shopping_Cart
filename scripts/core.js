
// ======================== //
// DECLARAMOS LAS VARIABLES //
// ======================== //

var articulo;
var pvp;
var cantidad;
var totalCompra;
var botonSumar;
const cesta = [];

// =========================== //
// CARGA DE JS DESPUES DEL DOM //
// =========================== //

window.addEventListener("load", ()=>{
	
	initVars();
	setListeners();

});

// =========================== //
// INICIALIZAMOS LAS VARIABLES //
// =========================== //

function initVars() {

	articulo = document.getElementById("articulo");
	pvp = document.getElementById("pvp");
	cantidad = document.getElementById("cantidad");
	totalCompra = document.getElementById("totalCompra");
	articulosCarrito = document.getElementById("articulosCarrito");
	botonSumar = document.getElementById("botonSumar");
	articulo.focus();

}

// ====================== //
// LANZAMOS LOS LISTENERS //
// ====================== //

function setListeners() {

	botonSumar.addEventListener("click",sumarAlCarrito());

}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
		var subtotal;
		var subtotal2
		subtotal = totalCompra.value*1;
		subtotal2 = parseInt(pvp.value*cantidad.value);
		if (pvp.value > 0 && cantidad.value > 0 && articulo.value != null){
			for (var i = 0; i < cantidad.value; i++) {
				cesta.push(articulo.value);
			}
			totalCompra.value = subtotal + subtotal2;
			articulosCarrito.value = cesta;
			console.log(subtotal);
			console.log(subtotal2);
			console.log(articulosCarrito.value);
		}
}




