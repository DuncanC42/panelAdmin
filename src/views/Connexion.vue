<script setup>

import FormConnexion from '@/components/FormConnexion.vue';
import FormInscription from '@/components/FormInscription.vue';
import { ref } from 'vue';

const createAccount = ref(false)

</script>

<template>
    <div class="main">
        <FormInscription v-show="createAccount" @connectAccount="createAccount = false"></FormInscription>
        <FormConnexion v-show="!createAccount" @createAccount="createAccount = true"></FormConnexion>
    </div>
</template>

<style scoped>
.main {

    background: linear-gradient(45deg, rgba(223, 223, 223, 0) 0%, #CADFF2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}


.main>* {
    background-color: white;
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 60px 80px;
    min-width: 360px;
    height: 55vh;
}
</style>