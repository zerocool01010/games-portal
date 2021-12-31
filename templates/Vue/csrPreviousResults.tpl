{literal}
	<div id="connector">
		<div v-if="isThereAWinner == true">
			<a v-on:click.prevent="getPrevR()" href="#">Ver resultados previos</a>
			<div v-if="resultsV">
				<ul>
				<li v-for="result in resultsV">La cantidad de juegos hasta la fecha son de: {{result.numbgames}}</li>
				</ul>
			</div>
			<div v-else>
			</div>
		</div>
		<div v-else>
            <h3>La partida está en juego</h3>
		</div>
	</div>
{/literal}