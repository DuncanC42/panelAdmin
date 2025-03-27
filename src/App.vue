<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>

<template>
    <div class="app">
        <Header></Header>
        <RouterView class="main"></RouterView>
    </div>
</template>

<style scoped>
.main {
    height: 90vh;
}
</style>