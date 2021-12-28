{literal}
	<div id="connector">
		<div v-if="isThereAWinner == true">
			<div v-if="undraw == true">
            <h1>Existo winner undraw</h1>
			</div>
			<div v-else>
            <h1>Existo winner else</h1>
			</div>
		</div> 
		<div v-if="itWasDraw == true">
            <h1>Existo itwasdraw</h1>
		</div>
		<div v-else>
            <h1>Existo else</h1>
		</div>
	</div>
{/literal}