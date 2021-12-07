"use strict";

// vamos a intentar eliminar las variables globales // las terminé convirtiendo en ArrayObjects

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let values1 = []
let values2 = []

canvas.addEventListener("click", redRect);
document.querySelector("#send").addEventListener("click", pickPos);

function redRect(){
    ctx.fillStyle = "red";
    let redR = 0;
    let xPosition = ((Math.random())*600);
    let yPosition = ((Math.random())*300);
    console.log("La posición X del rect rojo es: " + xPosition);
    console.log("La posición Y del rect rojo es: " + yPosition);
    redR = ctx.fillRect(xPosition, yPosition, 20, 20);
	seeConditions(xPosition, yPosition);
}

function seeConditions(xPos, yPos){
	let xPosP1, yPosP1, xPosP2, yPosP2 = undefined;
	for (const object of values1){
		if(object.xPos !== null){
		xPosP1 = object.xPos;
		}
		if (object.yPos !== null){
		yPosP1 = object.yPos;
		}
	}
	for (const object of values2){
		if(object.xPos !== null){
		xPosP2 = object.xPos;
		}
		if (object.yPos !== null){
		yPosP2 = object.yPos;
		}
	}	
    let conditionX1, conditionY1, conditionX2, conditionY2 = false;
    conditionX1 = (((xPosP1-20) <= xPos) && (xPos <= (xPosP1+20)));
    conditionY1 = (((yPosP1-20) <= yPos) && (yPos <= (yPosP1+20)));
    conditionX2 = (((xPosP2-20) <= xPos) && (xPos <= (xPosP2+20)));
    conditionY2 = ((yPosP2-20) <= yPos) && (yPos <= (yPosP2+20));
    try {
        if (conditionX1 == true && conditionY1 == true && conditionX2 == true && conditionY2 == true) {
            alert("Empate");
        } else if (conditionX2 == true && conditionY2 == true) {
            alert("El jugador 2 ha ganado"); 
        } else if (conditionX1 == true && conditionY1 == true) {
            alert("El jugador 1 ha ganado");
        }
    } catch (error) {
        console.error("Wrong!");
    }
}

function pickPos(){
    let form = document.querySelector("#form");
    let formData = new FormData(form);
    let pos1 = formData.get('posicion1');
    let pos2 = formData.get('posicion2');
    let rectColour = "a";
	console.log("this works!");
	console.log(pos1);
	console.log(pos2);
    if (pos1 !== undefined/*  && pos2 == false */) {
		console.log("this works too!");
		let posX1, posY1 = undefined;
		let posiciones1 = calculatePos1();
		for (const object of posiciones1){
			if(object.posicionX1 !== undefined){
				posX1 = object.posicionX1;
			}
			if (object.posicionY1 !== undefined){
				posY1 = object.posicionY1;
			}
		}
        rectColour = ctx.fillStyle = "black";
        playerPos(pos1, rectColour, posX1, posY1);
    }
    if (pos2 !== undefined/*  && pos1 == false */) {
		console.log("this works too!");
		let posX2, posY2 = undefined;
		let posiciones2 = calculatePos2();
		for (const object of posiciones2){
			if(object.posicionX2 !== undefined){
				posX2 = object.posicionX2;
			}
			if (object.posicionY2 !== undefined){
				posY2 = object.posicionY2;
			}
		}
        rectColour = ctx.fillStyle = "white";
        playerPos(pos2, rectColour, posX2, posY2);
    }
}
function calculatePos1(){
	let xPP1, yPP1 = undefined;
	xPP1 = ((Math.random())*200);
	yPP1 = ((Math.random())*150);
	let arrayObject1 = [{
						"posicionX1": xPP1, 
						"posicionY1": yPP1
						}];
	return arrayObject1;
}
function calculatePos2(){
	let xPP2, yPP2 = undefined;
	xPP2 = ((Math.random())*200);
	yPP2 = ((Math.random())*150);
	let arrayObject2 = [{
						"posicionX2": xPP2, 
						"posicionY2": yPP2
						}];
	return arrayObject2;
}  

function playerPos(pos, rectC, x, y){
	rectC;
    try {
        if (pos === "superior-izquierda") {
			rect = ctx.fillRect(x, y, 20, 20);
			
        } 
        else if (pos === "superior-centro") {
			x += 200;
            rect = ctx.fillRect(x, y, 20, 20);
			
        }
        else if (pos === "superior-derecha") {
			x += 400;
            rect = ctx.fillRect(x, y, 20, 20);
			
        }
        else if (pos === "inferior-izquierda") {
			x += 150;
            rect = ctx.fillRect(x, y, 20, 20);        
        } 
        else if (pos === "inferior-centro") {
			x += 200;
            y += 150;
            rect = ctx.fillRect(x, y, 20, 20);
        }
        else if (pos === "inferior-derecha") {
            x += 400;
            y += 150;
            rect = ctx.fillRect(x, y, 20, 20);
        }
    } catch (error) {
        console.error("Wrong!");
    }
		console.log("La posición X del rect "+ rectC +" es: " + x);
		console.log("La posición Y del rect "+ rectC +" es: " + y);
		let object = {
			"xPos": x,
			"yPos": y
		}
	if (rectC === "black"){ 
	values1.push(object);
	} else if (rectC === "white"){
	values2.push(object);
	}
}

