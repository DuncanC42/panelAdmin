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

	let base = +new Date(2025, 2, 25); // Start date: 25/03/2025
	let oneDay = 24 * 3600 * 1000;
	let date = [];
	let data = [];
	let endDate = +new Date(2025, 7, 15); // End date: 15/08/2025
	let totalAccounts = 0;

	while (base <= endDate) {
		var now = new Date(base);
		date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
		totalAccounts += Math.round(Math.random() * 500); // Random number of accounts created each day
		data.push(totalAccounts); // Total number of accounts created up to this day
		base += oneDay;
	}

	const option = {
		tooltip: {
			trigger: 'axis',
			position: function (pt) {
				return [pt[0], '10%'];
			}
		},
		title: {
			left: 'center',
			text: 'Large Area Chart'
		},

		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: date
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%']
		},
		dataZoom: [
			{
				type: 'inside',
				start: 0,
				end: 10
			},
			{
				start: 0,
				end: 10
			}
		],
		series: [
			{
				name: 'Nombre de compte créé',
				type: 'line',
				symbol: 'none',
				sampling: 'lttb',
				itemStyle: {
					color: 'rgb(255, 70, 131)'
				},
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgb(255, 158, 68)'
						},
						{
							offset: 1,
							color: 'rgb(255, 70, 131)'
						}
					])
				},
				data: data
			}
		]
	};

	myChart.setOption(option);
});
</script>

<style scoped>

span {
	font-size: large;
	margin: 0;
	margin-bottom: 20px;
	padding-left: 20px;
	color: rgb(66, 66, 66);
	font-weight: bold;
}

.conteneur>div {
	align-self: center;
}

.chart {
	width: 85%;
	/* Set width here */
	height: 85%;
	/* Set height here */
}
</style>