{include file="header.tpl"}
<h1>Reglas:</h1>
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
		<button type="button" id="move">Mover la viborita</button>
	</form>
		<button type="button" id="delete">Borrar viborita</button>
	<canvas class="canvas" id="canvas" width="400" height="400"></canvas>
</div>

{include file="srcJsSnake.tpl"}
{include file="footer.tpl"}