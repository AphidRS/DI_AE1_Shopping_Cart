
## DESARROLLO DE INTERFACES ##

## AE-1 SHOPPING CART ##

[https://github.com/AphidRS/aphidrs.github.io]

### ============== TEAM MEMBERS ============== ###

- Álvaro Hernantes Antón
- Daniel Ionut Fechete
- Daniel Mendoza Castellano
- Héctor José Tablado Sánchez

### ============== PROJECT FEATURES ============== ###

1. Permite añadir articulos, precio y cantidades, utilizando el objeto de la clase articulo.
2. Actualiza mediante un array los objetos añadidos y el precio total de la compra.
3. Muestra un ticket detallando articulos, cantidades y precio en formato tabla de html creando objetos del DOM desde JS.
4. Maneja los errores en la introduccion de datos si los hubiere informando al usuario y devolviendo el foco a la casilla afectada.
5. Despliega los campos necesarios en funcion del metodo de pago elegido.
6. Lanza dialogo mostrando un resumen de los detalles de la compra.

### ============== TASK ASSIGNMENT ============== ###

Para la realización de la práctica hemos dividido las tareas en cada una de sus partes fundamentales:

- **Html y Css:** Álvaro.
- **Función sumarAlCarrito:** Álvaro y Héctor.
- **Función Articulo:** Héctor.
- **Función checkValues:** Daniel Ionut, Héctor y Alvaro.
- **Función isArticuloNotEmptyAndNaN:** Daniel Ionut y Héctor.
- **Función isNotPvpCorrectValue:** Daniel Ionut y Héctor.
- **Función restoreWarning:** Álvaro y Daniel Mendoza.
- **Función opcionesPago:** Álvaro y Daniel Mendoza.
- **Función aceptarCondiciones:** Daniel Ionut.
- **Función imprimirAlert:** Daniel Mendoza.
- **Función resetear:** Héctor.

### ============== MAIN ISSUES ============== ###

Comenzamos realizando un analisis de los requerimientos y las metodologias
conocidas para implementar todos los requerimientos. Comenzamos utilizando la estructura mas sencilla y sencilla posible, no obstante definiendo la primera funcion compleja en JS como es **"sumarAlCarrito()"** nos encontramos con diversas estructuras condicionales y llamadas a otras funciones.

Es el caso de **"checkValues()"** que hubo que refactorizar y extraer todas las tareas individuales como funciones sencillas fuera de la principal como **"isArticuloNotEmptyAndNaN()"** y **"isNotPvpCorrectValue()"** contribuyendo a un codigo mas limpio y facil de interpretar.

Se han comentado todas las funciones para ayudar a comprender su uso, en el caso de la funcion **"sumarCarrito()"** esta incluida la logica para popular todos los articulos tambien en el "ticket" lateral incluido en la interfaz, aunque creemos que es posible individualizar mas ese codigo y extraerlo a otra funcion.

Hemos evitado por otro lado inyectar funciones de JS en el propio codigo HTML modificando siempre el DOM desde el fichero JS, como es el caso del **"botonReset"**.

### ============== CONCLUSION ============== ###

En general ha supuesto un reto muy interesante para todos los integrantes
del grupo, obligandonos a poner en comun los conocimientos del grupo para
buscar la solucion mas adecuada a cada problema.

Al ser un proyecto donde hemos trabajado de manera conjunta con pocos ficheros en GitHub hemos tenido que realizar algun Merge con bastantes conflictos, lo cual nos indica que debemos mejorar la comunicacion para
saber en todo momento que partes del codigo estamos trabajando cada uno.

Creemos que seria muy positivo para todos poder consultar y ver otros proyectos para enriquecer nuestros recursos de cara a futuros desafios y compartir nuestras experiencias. Ha resultado muy instructivo, tanto la fase de consulta de la documentacion como encontrar la manera de implementarlo en nuestro propio codigo.
