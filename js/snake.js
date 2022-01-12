"use strict";

let vueSnake = new Vue({
	el: "#connector",
	data: {
		message: "Initializing Vue",
        positions: [],
		savedHeight: 0,
		savedWidth: 0,
		escapeDoor: []
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
		}
		if (width > 0 || width < 0){
			vueSnake.savedWidth = width + vueSnake.savedWidth;
			console.log("El nuevo ancho almacenado es de: " + vueSnake.savedWidth);
		}
    } else {
        /* height = 1;
		width = 1; */
    }
	console.log("El ancho que se sumó por param es de " + width);
	console.log("La altura que se sumó por param es de " + height);
    /* vueSnake.positions.pop(); */
    ctx.fillStyle = "red";
    let redSnake = ctx.fillRect(vueSnake.savedWidth, vueSnake.savedHeight, 10, 40); //se genera el rectangulo rojo con las posiciones y sus medidas
    /* console.log(redSnake); */
    /* vueSnake.positions.push(redSnake); */
    /* console.log(vueSnake.positions); */
}

function deleteSnake(){
    /* vueSnake.positions.pop(); */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

console.log("holaSet 5.5");

function moveSnake(direction, quantity){
	deleteSnake();
	if (direction === "up" || direction === "down"){
		let height = quantity;
		if (direction === "down"){
			/* let idInterval1 =  */setTimeout(createSnake, 2500, 0, height);//en el setInterval o setTimeOut 1° param es para function, 2do param para milisegundos, y 4°, 5° y otros params para params de la function
			
			/* clearInterval(idInterval1); */
		} else if (direction === "up"){
			let negHeight = Number(height * (-1));
			setTimeout(createSnake, 2500, 0, negHeight);
		}
		
	} else {
		let width = quantity;
		if (direction === "right"){
			/* let idInterval2 =  */setTimeout(createSnake, 2500, width, 0);
			/* clearInterval(idInterval2); */
		} else if (direction === "left"){
			let negWidth = Number(width * (-1));
			setTimeout(createSnake, 2500, negWidth, 0);
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

function generateEscapeDoor(){
	
}