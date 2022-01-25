"use strict";

let vueSnake = new Vue({
	el: "#connector",
	data: {
		message: "Initializing Vue",
		savedHeight: 0,
		savedWidth: 0,
		height: 0,
		width: 0,
		obstWH: 30,
		doorWidth: 0,
		doorHeight: 0,
		escapeDoor: [],
		thereIsEscapeDoor: false,
		obstaclesSetUp: false,
		obsPositions: [],
		isTheGameOver: false,
		vertical: false,
		alreadyMoved: false,
		setUpLaterals: false,
		laterals: []
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
/* document.querySelector("#delete").addEventListener("click", deleteSnake); */

function createSnake(width, height, direction){
	if (!(vueSnake.isTheGameOver)){
		gameStarting(width, height);
		
		ctx.fillStyle = "red";
		if (direction === "up" || direction === "down"){
			let redSnake = ctx.fillRect(vueSnake.savedWidth, vueSnake.savedHeight, vueSnake.width, vueSnake.height); //se genera el rectangulo rojo con las posiciones y sus medidas
		} else {
			let redSnake = ctx.fillRect(vueSnake.savedWidth, vueSnake.savedHeight, vueSnake.width, vueSnake.height); // si el movimient es horizontal la vibora se acuesta
		}
		
    } else {
		console.log("Ya hay un resultado");
	}
}

function gameStarting(width, height){
	if (vueSnake.thereIsEscapeDoor){
			if (height !== 0) {
				vueSnake.savedHeight = height + vueSnake.savedHeight;
				console.log("La nueva altura almacenada es de: " + vueSnake.savedHeight);
			}
			if (width !== 0){
				vueSnake.savedWidth = width + vueSnake.savedWidth;
				console.log("El nuevo ancho almacenado es de: " + vueSnake.savedWidth);
			}
			generateEscapeDoor();
			watchLimitsCondition();
			watchConditionsFor(vueSnake.obsPositions, "perdido");
			watchConditionsFor(vueSnake.escapeDoor, "ganado");
		} else {
			let positOfDoor = generateEscapeDoor(); //genero la puerta de salida por primera vez //traigo un json de valores x e y de la puerta, y un tercer valor que indica si está al fondo o a la derecha
			vueSnake.escapeDoor = positOfDoor;
			console.log("Este sería el json que traigo con los valores X e Y de la puerta: " + vueSnake.escapeDoor.x + " y " + vueSnake.escapeDoor.y);
			vueSnake.thereIsEscapeDoor = true;
			let dificultad = document.querySelector("#dificultad").value; //viene la dificultad ingresada por el usuario expresada en un numero
			renderAllTheObstacles(dificultad-1); //el numero debe decir la cantidad de obstáculos en el juego
			vueSnake.obstaclesSetUp = true;
		}
	console.log("El ancho que se sumó por param es de " + width);
	console.log("La altura que se sumó por param es de " + height);
}

function deleteSnake(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake(direction, quantity){
	deleteSnake();
	keepingAllTheObstaclesInCanvas();
	if (direction === "up" || direction === "down"){
		vueSnake.vertical = true;
		vueSnake.height = 40;
		vueSnake.width = 10;
		let height = quantity;
		if (direction === "down"){
			setTimeout(createSnake, 100, 0, height, direction);//en el setInterval o setTimeOut 1° param es para function, 2do param para milisegundos, y 4°, 5° y otros params para params de la function
			
		} else if (direction === "up"){
			let negHeight = Number(height * (-1));
			setTimeout(createSnake, 100, 0, negHeight, direction);
		}
	} else {
		vueSnake.vertical = false;
		vueSnake.height = 10;
		vueSnake.width = 40;
		let width = quantity;
		if (direction === "right"){
			setTimeout(createSnake, 100, width, 0, direction);
			
		} else if (direction === "left"){
			let negWidth = Number(width * (-1));
			setTimeout(createSnake, 100, negWidth, 0, direction);
		}
		
	}
}

function moveSnakeAuto(){
	if (vueSnake.alreadyMoved && !(vueSnake.isTheGameOver)){
		receiveValues();
	}
}

setInterval(moveSnakeAuto, 300);

function receiveValues(){
	let form = document.querySelector("#form");
	let formData = new FormData(form);
	let direction = formData.get('moving'); //viene como valor uno de los siguientes: down-up-right-left
	/* let quantity = Number(formData.get('quant')); */ //valor numerico agregado por input
	/* let quantity = Number(document.querySelector("#move").value); */ //viene un valor fijo para mover de 10
	moveSnake(direction, 10);
	vueSnake.alreadyMoved = true;
}

function generateEscapeDoor(){
	ctx.fillStyle = "blue";
	if (vueSnake.thereIsEscapeDoor) { // si existe...
		for (let elem of vueSnake.escapeDoor){
			if (elem.side === "right") {
			let blueDoorRect = ctx.fillRect(elem.x, elem.y, vueSnake.doorWidth, vueSnake.doorHeight);
			} else { 
			let blueDoorRect = ctx.fillRect(elem.x, elem.y, vueSnake.doorWidth, vueSnake.doorHeight);
			} 
		}
		 
	} else { //si no existe aun
		let obj = doorPosit(); //traigo un array con las posiciones X e Y de la door
		if (obj.side === "bottom"){ //por la condicion que puse en doorPosit, X solo puede ser = a 397 si cae en el rightSide */
			let blueDoorRect = ctx.fillRect(obj.x, obj.y, vueSnake.doorWidth, vueSnake.doorHeight);
		} else {
			let blueDoorRect = ctx.fillRect(obj.x, obj.y, vueSnake.doorWidth, vueSnake.doorHeight);
		}
		return obj; //la retorno
	}
	
}

function doorPosit(){
	let randomSide = getRandomInt(); // traigo un 1 o un 2
	if (randomSide == 1) {
		vueSnake.doorWidth = 40;
		vueSnake.doorHeight = 10;
		let y = 397;
		let x = randomCanvasNum(399);
		let bottomSide = doorSide(x, y, "bottom");
		return bottomSide;
	} else {
		vueSnake.doorWidth = 10;
		vueSnake.doorHeight = 40;
		let x = 397;
		let y = randomCanvasNum(399);
		let rightSide = doorSide(x, y, "right");
		return rightSide;
	}
}

function doorSide(x, y, side){
	let sideD = [{
		"x": x,
		"y": y,
		"side": side
	}]
	return sideD;
}

function getRandomInt() {
	let max = 3;
    let min = 1;	
	let randNumb = Math.floor(Math.random() * (max - min)) + min; //devuelve por truncamiento un entero con el siguiente dominio {1; 2}
	console.log("El numero random es: " +randNumb);
	return randNumb;
}

function generateObstacles(obstacleAlreadySetUp){
	ctx.fillStyle = "black";
	if (!(vueSnake.obstaclesSetUp)) {
	let objPos = randomPositionForCanvas(); //traigo un objeto con nombres "x" e "y" y posiciones aleatorias para el tablero
	let blackObstacle = ctx.fillRect(objPos.x, objPos.y, vueSnake.obstWH, vueSnake.obstWH);
	return objPos;
	} else {
	let blackObstacle = ctx.fillRect(obstacleAlreadySetUp.x, obstacleAlreadySetUp.y, vueSnake.obstWH, vueSnake.obstWH); //esto es para mantener los valores de los obstáculos
	}
}

function renderAllTheObstacles(num){ //refactorizar con ciclo FOR
	for (let i = 0; i <= num; i++){
		let obsPosit = generateObstacles();
		vueSnake.obsPositions.push(obsPosit);
	}
	if (!(vueSnake.setUpLaterals)){
		generateLateralsBooleansForObs();
		vueSnake.setUpLaterals = true;
		console.log("esto solo se tiene que llamar una vez");
	}
	
}

function keepingAllTheObstaclesInCanvas(){
	if (vueSnake.obstaclesSetUp){
		obstaclesMovement();
		let pos = -1;
		for (let index = 0; index < vueSnake.obsPositions.length; index++) {
			/* const element = vueSnake.obsPositions[index]; */
			pos++;
			generateObstacles(vueSnake.obsPositions[pos])
		}
	}
}

function randomPositionForCanvas(){
	let xPos = randomCanvasNum(360);
	let yPos = randomCanvasNum(360);
	let obj = {
		"x": xPos,
		"y": yPos
	}
	return obj;
}
console.log("holaSet 9.6");

function obstaclesMovement(){
	console.log(vueSnake.laterals);
	console.log(vueSnake.obsPositions);
	for (let obsObj of vueSnake.obsPositions){
		let pos = vueSnake.obsPositions.indexOf(obsObj);
		console.log(pos);
		
		checkIfTouchedLateral(obsObj.x, 400, true, false, pos); //para chequear lateral derecho
		checkIfTouchedLateral(0, obsObj.x, false, true, pos); //para chequear lateral izquierdo
		
		if (vueSnake.laterals[pos].rightL){ //esto no está funcionando porque por alguna razón el cambio del valor de obsObj.x se refleja en el tablero pero no en consola
			obsObj.x -= 10;
		} else if (vueSnake.laterals[pos].leftL){
			obsObj.x += 10;
		} else {
			obsObj.x += 10;
		}
		let theNewObj = {
			"x": obsObj.x,
			"y": obsObj.y
		}
		vueSnake.obsPositions.splice(pos, 1, theNewObj);
	}
}

function checkIfTouchedLateral(ref1, ref2, boolRight, boolLeft, pos){
	if (ref1 >= ref2){
		let latObj = {
			"leftL": boolLeft,
			"rightL": boolRight
		}
		vueSnake.laterals.splice(pos, 1, latObj);
	}
}

function generateLateralsBooleansForObs(){
	let obj = {
		"leftL": false,
		"rightL": false
	}
	for (let index = 0; index < vueSnake.obsPositions.length; index++){
		vueSnake.laterals.push(obj);
	}
}

function watchLimitsCondition(){
	if (vueSnake.savedWidth + vueSnake.width > 400 || vueSnake.savedWidth < 0 || vueSnake.savedHeight + vueSnake.height > 400 || vueSnake.savedHeight < 0){
		vueSnake.isTheGameOver = true;
		console.log("El jugador ha perdido porque ha tocado los bordes");
	}
}

function watchConditionsFor(toRun, result){ //revisa las condiciones de victoria o derrota recorriendo a las puertas u obstáculos
	let bool = false;
	for (let elem of toRun){
		bool = areasComparison(elem, result);
		if (bool) {
		console.log("El jugador ha " + result + ". La serpiente ha terminado su recorrido");
		vueSnake.isTheGameOver = true;			
		}
	}
	
}

function areasComparison(runned, possibleResult){ //se encarga de medir condiciones de victoria o derrota recibiendo elementos por param de puerta u obstaculo
	let xComp, yComp = false;
	if (possibleResult === "perdido"){
		xComp = xComparison(vueSnake.obstWH, runned.x);
		yComp = yComparison(vueSnake.obstWH, runned.y);
	} else if (possibleResult === "ganado"){
		xComp = xComparison(vueSnake.doorWidth, runned.x);
		yComp = yComparison(vueSnake.doorHeight, runned.y);
	}
	if (xComp && yComp){
		return true;
	} else {
		return false;
	}
}

function xComparison(ObstDoorWidth, posX){
	if (vueSnake.savedWidth + vueSnake.width >= posX && vueSnake.savedWidth <= posX + ObstDoorWidth){
		return true;
	} else {
		return false;
	}
}

function yComparison(ObstDoorHeight, posY){
	if (vueSnake.savedHeight + vueSnake.height >= posY && vueSnake.savedHeight <= posY + ObstDoorHeight){
		return true;
	} else {
		return false;
	}
}

function randomCanvasNum(num){ //genera numeros random para valores del tablero
	let rand = (Math.random()) * num;
	return rand;
}