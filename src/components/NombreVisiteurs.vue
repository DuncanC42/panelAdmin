<template>
  <div class="conteneur">
    <div class="title">Nombre de joueurs en ligne</div>
    <div class="counter">{{ userCount }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const URI = import.meta.env.VITE_URI;
const WS_PORT = import.meta.env.VITE_WS_PORT;

const ws = ref(null);
const userCount = ref(0);

onMounted(() => {
    ws.value = new WebSocket(`ws://${URI}:8051`);

    ws.value.onopen = () => {
        ws.value.send(JSON.stringify({ action: 'adminConnected' })); // Juste une écoute
    };

    ws.value.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.userCount !== undefined) {
            userCount.value = data.userCount;
        }
    };
});


onUnmounted(() => {
  if (ws.value) {
    ws.value.close();
  }
});
</script>

<style scoped>
.conteneur {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 180px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  width: 100%;
  margin-bottom: 5px;
}

.counter {
  font-size: 48px;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-top: 5px;
  font-family: Arial, sans-serif;
}

/* Adaptation de la taille pour les grands nombres */
@media screen and (max-width: 200px) {
  .counter {
    font-size: 40px;
  }
}
</style>