"use strict";

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //creo el "tablero" canvas
let values1 = [] //aca se guardan las posiciones del J1
let values2 = [] //aca se guardan las posiciones del J2

canvas.addEventListener("click", redRect);
document.querySelector("#send1").addEventListener("click", pickPos);
document.querySelector("#send2").addEventListener("click", pickPos);

function redRect(){ // creo el rectangulo rojo
    ctx.fillStyle = "red";
    let redR = 0; //inicializo
    let xPosition = ((Math.random())*600); //posicion X aleatoria * el ancho del tablero
    let yPosition = ((Math.random())*300); //posicion Y aleatoria * el alto del tablero
    console.log("La posición X del rect rojo es: " + xPosition);
    console.log("La posición Y del rect rojo es: " + yPosition);
    redR = ctx.fillRect(xPosition, yPosition, 20, 20); //se genera el rectangulo rojo con las posiciones y sus medidas
	seeConditions(xPosition, yPosition); //paso sus posiciones como params
}

function seeConditions(xPos, yPos){ // ve las condiciones para definir victoria, derrota o empate
	let xPosP1, yPosP1, xPosP2, yPosP2 = undefined;
	for (const object of values1){ //recorre el json values1 con las posiciones del jugador 1
		if(object.xPos !== null){
		xPosP1 = object.xPos; //extrae la posicion en X
		}
		if (object.yPos !== null){
		yPosP1 = object.yPos; //extrae la posicion en Y
		}
	}
	for (const object of values2){ // idem arriba pero para jugador 2
		if(object.xPos !== null){
		xPosP2 = object.xPos;
		}
		if (object.yPos !== null){
		yPosP2 = object.yPos;
		}
	}	
    let conditionX1, conditionY1, conditionX2, conditionY2 = false; //condiciones de X e Y para jugadores 1 y 2
    conditionX1 = ((xPosP1-20) <= xPos) && (xPos <= (xPosP1+20)); //la pos en X del J1 respecto de la posicion en X del rect rojo
    conditionY1 = ((yPosP1-20) <= yPos) && (yPos <= (yPosP1+20)); //la pos en Y del J1 respecto de la posicion en Y del rect rojo
    conditionX2 = ((xPosP2-20) <= xPos) && (xPos <= (xPosP2+20)); //la pos en X del J2 respecto de la posicion en X del rect rojo
    conditionY2 = ((yPosP2-20) <= yPos) && (yPos <= (yPosP2+20)); //la pos en X del J2 respecto de la posicion en Y del rect rojo
    try {
        if (conditionX1 == true && conditionY1 == true && conditionX2 == true && conditionY2 == true) {  //se debe cumplir todo para empate
            alert("Empate");
        } else if (conditionX2 == true && conditionY2 == true) { //las condiciones para que gane el 2
            alert("El jugador 2 ha ganado"); 
        } else if (conditionX1 == true && conditionY1 == true) { //las condiciones para que gane el 1
            alert("El jugador 1 ha ganado");
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
    let rectColour = "a"; //inicializo
	console.log("this works!");
	console.log(pos1);
	console.log(pos2);
    
	if (pos1 !== undefined && values1[0] === undefined) { //si existe...
        rectColour = ctx.fillStyle = "black"; //color negro al rect del J1
		let posiciones = calculatePos(); //traigo las posiciones random de X e Y en un array
		playerPos(pos1, rectColour, posiciones[0], posiciones[1]); //le mando los params
	} if (pos2 !== undefined && values2[0] === undefined){
		rectColour = ctx.fillStyle = "white"; //color blanco al rect del J2
		let posiciones = calculatePos(); //traigo las posiciones random de X e Y en un array
		playerPos(pos2, rectColour, posiciones[0], posiciones[1]); //le mando los params
	}
}

function calculatePos(){
	let xP, yP = undefined; //inicializo
	xP = ((Math.random())*200); //calculo random para X (el resto de la medida se completa en playerPos)
	yP = ((Math.random())*150); //calculo random para Y (el resto de la medida se completa en playerPos)
	let arrayPos = [xP, yP]; //guardo las pos en un arreglo
	return arrayPos; //lo devuelvo
}

function playerPos(pos, rectC, x, y){ //recibe los params del J1 o J2
	if (pos !== ""){
		rectC; //negro (J1) o blanco (J2). Debe traerse para que el rect generado pueda leer el color (trae el fillStyle)
		try {
			if (pos === "superior-izquierda") {
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto
				
			} 
			else if (pos === "superior-centro") {
				x += 200;
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto pero le suma 200 a la pos X
				
			}
			else if (pos === "superior-derecha") {
				x += 400;
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto pero le suma 400 a la pos X
				
			}
			else if (pos === "inferior-izquierda") {
				y += 150;
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto pero le suma 150 a la pos Y  
			} 
			else if (pos === "inferior-centro") {
				x += 200;
				y += 150;
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto pero le suma 150 a la pos Y y 200 a la X
			}
			else if (pos === "inferior-derecha") {
				x += 400;
				y += 150;
				rect = ctx.fillRect(x, y, 20, 20); //crea el rect en las posiciones random por defecto pero le suma 150 a la pos Y y 400 a la X
			}
		} catch (error) {
			console.error("Wrong!");
		}
			console.log("La posición X del rect "+ rectC +" es: " + x);
			console.log("La posición Y del rect "+ rectC +" es: " + y);
			let object = { //guardo las posiciones traidas para J1 o J2 en este objecto
				"xPos": x,
				"yPos": y
			}
		if (rectC === "black"){ //si es del J1 === negro
		values1.push(object); //las mando al array values para que luego puedan ser leidas para las condiciones de victoria
		} else if (rectC === "white"){ //si es del J1 === negro
		values2.push(object); //las mando al array values para que luego puedan ser leidas para las condiciones de victoria
		}
	} else {
		console.error("No ingresada la posicion");
	}
	
}

