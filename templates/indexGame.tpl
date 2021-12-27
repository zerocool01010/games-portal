{include file="header.tpl"}
<h1>Reglas:</h1>
    <p>El jugador 1 y 2 deberán ingresar una posición en el tablero. Luego deberán hacer click en el tablero para jugar hasta finalizar el juego.</p>
    <p>Finaliza cuando uno de los rectángulos rojos interactue con la posición ingresada por uno de los jugadores.</p>
    <p>Gana el jugador que primero obtiene la interacción.</p>
    <h2>Colores:</h2>
    <p>Jugador 1: negro</p>
    <p>Jugador 2: blanco</p>
    <form id="form1">
        <h2>Jugador 1</h2>
        <label for="posicion1">Elegir posicion:</label>
		<select name="posicion1" value="posicion1" id="posit1" required>
		<option value="" hidden selected>Seleccione una posición</option>
		<option value="0/0">Superior izquierda</option>
		<option value="200/0">Superior centro</option>
		<option value="400/0">Superior derecha</option>
		<option value="0/150">Inferior izquierda</option>
		<option value="200/150">Inferior centro</option>
		<option value="400/150">Inferior derecha</option>
		</select>
        <button type="button" id="send1">Confirmar</button>
    </form>
    <form id="form2">
        <h2>Jugador 2</h2>
        <label for="posicion2">Elegir posicion:</label>
		<select name="posicion2" value="posicion2" id="posit2" required>
		<option value="" hidden selected>Seleccione una posición</option>
		<option value="0/0">Superior izquierda</option>
		<option value="200/0">Superior centro</option>
		<option value="400/0">Superior derecha</option>
		<option value="0/150">Inferior izquierda</option>
		<option value="200/150">Inferior centro</option>
		<option value="400/150">Inferior derecha</option>
		</select>
        <button type="button" id="send2">Confirmar</button>
    </form>
    <canvas class="canvas" id="canvas" width="600" height="300"></canvas>
{include file="Vue/apibuttons.tpl"}
{include file="srcJs.tpl"}
{include file="footer.tpl"}