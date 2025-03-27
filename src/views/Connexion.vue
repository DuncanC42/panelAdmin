<script setup>

import FormConnexion from '@/components/FormConnexion.vue';

</script>

<template>
    <div class="main">
        <FormConnexion></FormConnexion>
    </div>
</template>

<style scoped>
.main {
    height: 82vh;
    background: linear-gradient(45deg, rgba(223, 223, 223, 0) 0%, #CADFF2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}


.main>* {
    background-color: white;
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding:60px 80px;
    width: 15vw;
}
</style>