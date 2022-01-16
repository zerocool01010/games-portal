{include file="header.tpl"}
<h1>Reglas:</h1>
<p>Busque la puerta de salida (en azul) con la viborita (rojo). Evite los obstáculos para no perder</p>
<p>Cargue la cantidad a mover, para desplazarse por el tablero. Luego mueva, presionando el botón</p>
<p>Elija la dificultad antes de empezar, entre un mínimo de 3(muy fácil) y un máximo de 14</p>
<div id="connector">
	<form id="form">
		<button type="button" id="create">Crear snake</button>
		<select name="moving" value="moving" id="moving" required>
			<option value="" hidden selected>Seleccione hacia donde mover</option>
			<option value="down">Abajo</option>
			<option value="up">Arriba</option>
			<option value="right">Derecha</option>
			<option value="left">Izquierda</option>
		</select>
		<input type="number" id="quant" name="quant" placeholder="Cantidad" min="1" max="399" required>
		<input type="number" id="dificultad" name="dificultad" placeholder="Elegir dificultad del juego" min="3" max="14" required>
		<button type="button" id="move">Mover la viborita</button>
	</form>
		<button type="button" id="delete">Borrar viborita</button>
	<canvas class="canvas" id="canvas" width="400" height="400"></canvas>
</div>

{include file="srcJsSnake.tpl"}
{include file="footer.tpl"}