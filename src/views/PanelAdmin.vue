<script setup>

import PieChart from '../components/PieChart.vue';
import DiagramChart from '@/components/DiagramChart.vue';
import PlayerManagement from "@/views/PlayerManagement.vue";
import {useTokenStore} from '@/stores/tokenStore';
import {useRouter} from 'vue-router';
import {fetchBackend} from '@/composable/fetchBackend';
import NombreVisiteurs from "@/components/NombreVisiteurs.vue";

const router = useRouter();
const tokenStore = useTokenStore();

fetchBackend('intranet/hello', 'GET')

if (!tokenStore.isAuthenticated) {
    router.push('/');
}

</script>

<template>
    <div class="panel-admin">
        <div class="column">
            <transition name="slide-fade" appear>
                <div class="chart chart-1" key="chart1">
                    <PieChart></PieChart>
                </div>
            </transition>
            <transition name="slide-fade" appear>
                <div class="chart chart-2" key="chart2">
                    <DiagramChart></DiagramChart>
                </div>
            </transition>
        </div>
        <div class="column" style="width: 50vw; height: 25vh;">
            <transition name="slide-fade" appear>
                <div class="chart chart-3" key="chart3">
                    <NombreVisiteurs></NombreVisiteurs>
                </div>
            </transition>
        </div>
        <div class="column">
            <transition name="slide-fade" appear>
                <div class="chart chart-4" key="chart4">
                    <PlayerManagement></PlayerManagement>
                </div>
            </transition>
        </div>
    </div>
</template>

<style scoped>
.panel-admin {
    display: flex;
    justify-content: center;
    gap: 30px;
    height: 86vh;
    background: linear-gradient(45deg, rgba(223, 223, 223, 0) 0%, #CADFF2 100%);
    padding: 2vh;
}

/* #DFDFDF with 0 opacity to #CADFF2 with 100% opcacity in diagonal */

.column {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.column > * {
    height: 100%;
    width: 100%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.chart {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: calc(0.3s * var(--chart-index));
    height: 100%;
    width: 100%;
}

.chart > * {
    height: 100%;
    width: 100%;
}

.column > * > *:hover {
    transform: scale(1.03);
}

.column > * > * {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transition-delay: 0.1s;
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 20px;
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
}

.chart-1 {
    --chart-index: 1;
}

.chart-2 {
    --chart-index: 2;
}

.chart-3 {
    --chart-index: 3;
}

.chart-4 {
    --chart-index: 4;
}

.chart-5 {
    --chart-index: 5;
}
</style>
