{literal}
<div id="connector">
	<form id="form">
		<select name="moving" value="moving" id="moving" required>
			<option value="" hidden selected>Seleccione hacia donde mover</option>
			<option value="down">Abajo</option>
			<option value="up">Arriba</option>
			<option value="right">Derecha</option>
			<option value="left">Izquierda</option>
		</select>
		<input type="number" id="dificultad" name="dificultad" placeholder="Elegir dificultad del juego" min="3" max="14" required>
		<div v-if="alreadyMoved == false">
        <button type="button" id="create">Comenzar partida</button>
		<button value="10" type="button" id="move">Mover la viborita</button>
		</div>
		<div v-else>
		</div>
	</form>
	<canvas class="canvas" id="canvas" width="400" height="400"></canvas>
</div>
{/literal}