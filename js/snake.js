"use strict";

let vueSnake = new Vue({
	el: "#connector",
	data: {
		message: "Initializing Vue",
        positions: [],
		savedHeight: 0,
		savedWidth: 0,
		escapeDoor: [],
		thereIsEscapeDoor: false
	},
	methods: {
		/* getPrevR: function(){
			getCountOfPreviousResults();
		} */
    }
});
vueSnake.message = "Vue initialized";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //creo el "tablero" canvas
document.querySelector("#create").addEventListener("click", createSnake);
document.querySelector("#move").addEventListener("click", receiveValues);
document.querySelector("#delete").addEventListener("click", deleteSnake);

function createSnake(width, height){
    if (height > 0 || height < 0 || width > 0 || width < 0){
		if (height > 0 || height < 0) {
			vueSnake.savedHeight = height + vueSnake.savedHeight;
			console.log("La nueva altura almacenada es de: " + vueSnake.savedHeight);
			generateEscapeDoor();
		}
		if (width > 0 || width < 0){
			vueSnake.savedWidth = width + vueSnake.savedWidth;
			console.log("El nuevo ancho almacenado es de: " + vueSnake.savedWidth);
			generateEscapeDoor();
		}
    } else {
		let positOfDoor = generateEscapeDoor(); //genero la puerta de salida por primera vez //traigo un arreglo simple de dos posiciones (valores x e y de la puerta)
		vueSnake.escapeDoor = positOfDoor;
		console.log("Este sería el array que traigo con los valores X e Y de la puerta: " + vueSnake.escapeDoor[0] + " y " + vueSnake.escapeDoor[1]);
		vueSnake.thereIsEscapeDoor = true;
	}
	console.log("El ancho que se sumó por param es de " + width);
	console.log("La altura que se sumó por param es de " + height);
    
    ctx.fillStyle = "red";
    let redSnake = ctx.fillRect(vueSnake.savedWidth, vueSnake.savedHeight, 10, 40); //se genera el rectangulo rojo con las posiciones y sus medidas
    
}

function deleteSnake(){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake(direction, quantity){
	deleteSnake();
	if (direction === "up" || direction === "down"){
		let height = quantity;
		if (direction === "down"){
			setTimeout(createSnake, 500, 0, height);//en el setInterval o setTimeOut 1° param es para function, 2do param para milisegundos, y 4°, 5° y otros params para params de la function
			
		} else if (direction === "up"){
			let negHeight = Number(height * (-1));
			setTimeout(createSnake, 500, 0, negHeight);
		}
		
	} else {
		let width = quantity;
		if (direction === "right"){
			setTimeout(createSnake, 500, width, 0);
			
		} else if (direction === "left"){
			let negWidth = Number(width * (-1));
			setTimeout(createSnake, 500, negWidth, 0);
		}
		
	}
}

function receiveValues(){
	let form = document.querySelector("#form");
	let formData = new FormData(form);
	let direction = formData.get('moving'); //viene como valor uno de los siguientes: down-up-right-left
	let quantity = Number(formData.get('quant')); //valor numerico agregado por input
	moveSnake(direction, quantity);
}

console.log("holaSet 5.92");

function generateEscapeDoor(){
	ctx.fillStyle = "blue";
	if (vueSnake.thereIsEscapeDoor) { // si existe...
		 if (vueSnake.escapeDoor[2] === "right") {
			let blueDoorRect = ctx.fillRect(vueSnake.escapeDoor[0], vueSnake.escapeDoor[1], 10, 40);
		} else { 
			let blueDoorRect = ctx.fillRect(vueSnake.escapeDoor[0], vueSnake.escapeDoor[1], 40, 10);
		} 
	} else { //si no existe aun
		let arrayXaY = doorPosit(); //traigo un array con las posiciones X e Y de la door
		if (arrayXaY[2] === "bottom"){ //por la condicion que puse en doorPosit, X solo puede ser = a 397 si cae en el rightSide */
			let blueDoorRect = ctx.fillRect(arrayXaY[0], arrayXaY[1], 10, 40);
		} if (arrayXaY[2] === "right") {
			let blueDoorRect = ctx.fillRect(arrayXaY[0], arrayXaY[1], 40, 10);
		}
		return arrayXaY; //la retorno
	}
	
}

function doorPosit(){
	let randomSide = getRandomInt(); // traigo un 1 o un 2
	if (randomSide == 1) {
		let y = 397;
		let x = (Math.random()) * 399;
		/* if (x == 397) {
			x += 1; //esto lo hago para evitar que pueda quedar en 397 y se pueda cumplir la condicion de control en generateEscapeDoor
		} */
		let bottomSide = [x, y, "bottom"];
		return bottomSide;
	} else {
		let x = 397;
		let y = (Math.random()) * 399;
		let rightSide = [x, y, "right"];
		return rightSide;
	}
}

function getRandomInt() {
	let max = 3;
    let min = 1;	
	let randNumb = Math.floor(Math.random() * (max - min)) + min; //devuelve por truncamiento un entero con el siguiente dominio {1; 2}
	console.log("El numero random es: " +randNumb);
	return randNumb;
}
