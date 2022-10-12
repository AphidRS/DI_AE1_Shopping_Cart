
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
	setListeners();

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

	botonSumar.addEventListener("click",sumarAlCarrito());

}

// ======================== //
// DECLARACION DE FUNCIONES //
// ======================== //

function sumarAlCarrito() {
		var subtotal;
		var subtotal2

		// Convertimos valor de totalCompra a numero para evitar concatenacion de strings
		subtotal = totalCompra.value*1;
		subtotal2 = parseInt(pvp.value*cantidad.value);

		// Comprobamos que articulo no es nulo
		if (articulo.value != null){

			// Comprobamos que el pvp es mayor que 0
			if (pvp.value > 0){

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
				articulo.value = null;
				pvp.value = "0";
				cantidad.value = 1;
				articulo.focus();

			} else {

				faltaPrecio.style.visibility = "visible";
				pvp.value = 0;
				pvp.focus();

			}

		} else {

			faltaArticulo.style.visibility = "visible";
			articulo.value = null;
			articulo.focus();
			articulo.style.border.color = "red";
		}

}




