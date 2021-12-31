"use strict";

let vueApp1 = new Vue({
	el: "#connector",
	data: {
		message: "Initializing Vue",
		isThereAWinner: false, //la usamos para guardar info del estado de si: hay ganador-no hay ganador
		undraw: false, //para estado de si hay o no desempate
		itWasDraw: false, //para estado de si hubo o no empate
		resultsV: []
	},
	methods: {
		getPrevR: function(){
			getCountOfPreviousResults();
		}
    }
});
vueApp1.message = "Vue initialized";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //creo el "tablero" canvas
let values1 = [] //aca se guardan las posiciones del J1
let values2 = [] //aca se guardan las posiciones del J2

canvas.addEventListener("click", redRect);
document.querySelector("#send1").addEventListener("click", pickPos);
document.querySelector("#send2").addEventListener("click", pickPos);

function redRect(){ // creo el rectangulo rojo
	/* let vueApp1.isThereAWinner = checkingIfWinners(); */
	console.log(vueApp1.isThereAWinner);
	if (!(vueApp1.isThereAWinner)) {
		ctx.fillStyle = "red";
		let xPosition = ((Math.random())*600); //posicion X aleatoria * el ancho del tablero
		let yPosition = ((Math.random())*300); //posicion Y aleatoria * el alto del tablero
		console.log("La posición X del rect rojo es: " + xPosition);
		console.log("La posición Y del rect rojo es: " + yPosition);
		let redR = ctx.fillRect(xPosition, yPosition, 20, 20); //se genera el rectangulo rojo con las posiciones y sus medidas
		seeConditions(xPosition, yPosition); //paso sus posiciones como params
	} else if (vueApp1.isThereAWinner || vueApp1.itWasDraw && vueApp1.isThereAWinner !== "empate") {
		alert("La partida ha finalizado");
	} else if (vueApp1.isThereAWinner === "empate"){
		alert("¿Desea desempatar?");
		let decision = prompt("Responda con SI o NO");
		if (decision == "SI" || decision == "si"){
			vueApp1.isThereAWinner = false;
			vueApp1.undraw = true;
		} else if (decision == "NO" || decision == "no") {
			vueApp1.isThereAWinner = false;
			vueApp1.itWasDraw = true;
			if (vueApp1.itWasDraw){
				addResults("draw");
			}
		} else {
			alert("Responda lo solicitado, por favor!");
			redRect();
		}
	}    
}

function runningArrayValues(valuesN, obj){
	let xOrYPos = null;
	for (const object of valuesN){ //recorre el json para "X" o "Y" de los values1/2 con las posiciones del jugador 1/2
		if(obj === "x"){
			if(object.xPos !== null){
				xOrYPos = object.xPos; //extrae la posicion en X
			}
		}
		if(obj === "y"){
			if(object.yPos !== null){
				xOrYPos = object.yPos; //extrae la posicion en Y
			}
		}
	}
	return xOrYPos;
}

function seeConditions(xPos, yPos){ // ve las condiciones para definir victoria, derrota o empate
	let xPosP1 = runningArrayValues(values1, "x");
	let yPosP1 = runningArrayValues(values1, "y");
	let xPosP2 = runningArrayValues(values2, "x");
	let yPosP2 = runningArrayValues(values2, "y");

    let conditionX1, conditionY1, conditionX2, conditionY2 = false; //condiciones de X e Y para jugadores 1 y 2
    conditionX1 = ((xPosP1-20) <= xPos) && (xPos <= (xPosP1+20)); //la pos en X del J1 respecto de la posicion en X del rect rojo
    conditionY1 = ((yPosP1-20) <= yPos) && (yPos <= (yPosP1+20)); //la pos en Y del J1 respecto de la posicion en Y del rect rojo
    conditionX2 = ((xPosP2-20) <= xPos) && (xPos <= (xPosP2+20)); //la pos en X del J2 respecto de la posicion en X del rect rojo
    conditionY2 = ((yPosP2-20) <= yPos) && (yPos <= (yPosP2+20)); //la pos en X del J2 respecto de la posicion en Y del rect rojo
    try {
        if (conditionX1 == true && conditionY1 == true && conditionX2 == true && conditionY2 == true) {  //se debe cumplir todo para empate
            alert("Empate");
			vueApp1.isThereAWinner = "empate";
        } else if (conditionX2 == true && conditionY2 == true) { //las condiciones para que gane el 2
            alert("El jugador 2 ha ganado");
			vueApp1.isThereAWinner = true;
			if (vueApp1.isThereAWinner){
				if (vueApp1.undraw){
					addResults("undraw");
				} else {
					addResults(false);
				}
			}
        } else if (conditionX1 == true && conditionY1 == true) { //las condiciones para que gane el 1
            alert("El jugador 1 ha ganado");
			vueApp1.isThereAWinner = true;
			if (vueApp1.isThereAWinner){
				if (vueApp1.undraw){
					addResults("undraw");
				} else {
					addResults(false);
				}
			}
        }
    } catch (error) {
        console.error("Wrong!");
    }
}

function pickPos(){
    let form1 = document.querySelector("#form1");
	let form2 = document.querySelector("#form2");
    let formData1 = new FormData(form1);
	let formData2 = new FormData(form2);
    let pos1 = formData1.get('posicion1'); //viene la zona de posicion ingresada en el select para el J1
    let pos2 = formData2.get('posicion2'); //viene la zona de posicion ingresada en el select para el J2
	console.log(pos1);
	console.log(pos2);
    
	if (pos1 !== undefined && values1[0] === undefined) { //si existe pos y values no está definido...
        colourPosAndCallingCalculate("black", pos1);
	} if (pos2 !== undefined && values2[0] === undefined){
		colourPosAndCallingCalculate("white", pos2);
	}
}

function colourPosAndCallingCalculate(colour, pos){
	let rectColour = "a"; //inicializo
	rectColour = ctx.fillStyle = colour; //color negro/blanco al rect del J1/J2
	let posiciones = calculatePos(); //traigo las posiciones random de X e Y en un array
	playerPos(pos, rectColour, posiciones[0], posiciones[1]); //le mando los params
}

function calculatePos(){
	let xP, yP = undefined; //inicializo
	xP = ((Math.random())*200); //calculo random para X (el resto de la medida se completa en playerPos)
	yP = ((Math.random())*150); //calculo random para Y (el resto de la medida se completa en playerPos)
	let arrayPos = [xP, yP]; //guardo las pos en un arreglo
	console.log(arrayPos);
	return arrayPos; //lo devuelvo
}

function playerPos(pos, rectC, x, y){ //recibe los params del J1 o J2
	if (pos !== ""){ //para que no funcione con la opción por defecto del select: "Seleccionar posicion" cuyo value es ""
		rectC; //negro (J1) o blanco (J2). Debe traerse para que el rect generado pueda leer el color (trae el fillStyle)
		try {
			let objectV = positByInput(pos, x, y, rectC);
			if (rectC === "black"){ //si es del J1 === negro //si no pongo esto dentro del try el objectV queda como si nunca fuera leido
				values1.push(objectV); //las mando al array values para que luego puedan ser leidas para las condiciones de victoria
				console.log(values1);
			} else if (rectC === "white"){ //si es del J1 === negro
				values2.push(objectV); //las mando al array values para que luego puedan ser leidas para las condiciones de victoria
				console.log(values2);
			}
		} catch (error) {
			console.error("Wrong!");
		}
	} else {
		console.error("No ingresada la posicion");
	}
}

function positByInput(additionalValue, x, y, rectC){
	rectC; //negro (J1) o blanco (J2). Debe traerse para que el rect generado pueda leer el color (trae el fillStyle)
	console.log("here");
		let toSplit = additionalValue;
		let values = toSplit.split("/");
		x += Number(values[0]);
		y += Number(values[1]);
	console.log(x);
	console.log(y);
	let rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto + los valores agregados de tenerlos

	let object = { //guardo las posiciones traidas para J1 o J2 en este objecto
		"xPos": x,
		"yPos": y
	}
	console.log(object);
	return object;
}

//a partir de acá las funciones API

const API_URL = "api/game";

async function addResults(param){
	let obj = {}
	if (param){
		if (param === "undraw"){
			obj = {
				"victoria": true,
				"empate": false,
				"desempate": true
			}
		}
		} else if (param === "draw"){
			obj = {
				"victoria": false,
				"empate": true,
				"desempate": false
			}
		}
	else {
		obj = {
			"victoria": true,
			"empate": false,
			"desempate": false
		}
	}
	try {
		let res = await fetch (API_URL, {
			"method": "POST",
			"headers": {"Content-type": "application/json"},
			"body": JSON.stringify(obj)
		});
		if(res.status == 200){
			console.log("Datos cargados!")
		}
	} catch (e) {
		console.error(e);
	}
}

async function getCountOfPreviousResults(){
	try {
		let response = await fetch(API_URL);
		let results = await response.json();
		console.log(results);
		vueApp1.resultsV = results;
	} catch (e) {
		console.error(e)
	}
}