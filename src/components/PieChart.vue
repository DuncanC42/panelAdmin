<template>
	<div class="conteneur">
		<span>Temps moyen passé sur chaque jeu</span>
		<div ref="chart" class="chart"></div> <!-- Use class for styling -->
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chart = ref(null);

onMounted(() => {
	const myChart = echarts.init(chart.value);

	const option = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '0',
			left: 'center',
			textStyle: {
				fontSize: 10 // Reduced font size for legend elements
			}
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 20,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [
					{ value: 1048, name: 'Carte vitale' },
					{ value: 735, name: 'C2S' },
					{ value: 580, name: 'RIB' },
					{ value: 484, name: 'Examen de prévention' },
					{ value: 300, name: 'M\'T dents' }
				]
			}
		]
	};

	myChart.setOption(option);
});
</script>

<style scoped>

.conteneur {
	display: flex;
	flex-direction: column;
	justify-content: end;
	background-color: white;
	border-radius: 20px;
	box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1); /* Added box shadow */
}

span {
	font-size: large;
	margin: 0;
	margin-bottom: 20px;
	padding-left: 20px;
	color : rgb(66, 66, 66);
	font-weight: bold;
}

.conteneur > div {
	align-self: center;
}

.chart {
	width: 85%; /* Set width here */
	height: 85%; /* Set height here */
}
</style>