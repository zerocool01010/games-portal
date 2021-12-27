{literal}
	<div id="connector">
		<div v-if="isThereAWinner == true">
			<div v-if="undraw == true">
            <h1>Existo winner undraw</h1>
			<a v-on:click.prevent="addGameUndraw" href="#">Enviar datos de partida desempatada</a>
			</div>
			<div v-else>
            <h1>Existo winner else</h1>
			<a v-on:click.prevent="addGame" href="#">Enviar datos de partida</a>
			</div>
		</div> 
		<div v-if="itWasDraw == true">
            <h1>Existo itwasdraw</h1>
			<a v-on:click.prevent="addGameD" href="#">Enviar datos de partida empatada</a>
		</div>
		<div v-else>
            <h1>Existo else</h1>
		</div>
	</div>
{/literal}