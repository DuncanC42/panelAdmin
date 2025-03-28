<script setup>

import FormConnexion from '@/components/FormConnexion.vue';
import FormInscription from '@/components/FormInscription.vue';
import { ref } from 'vue';

const createAccount = ref(false)
const page_connexion = ref(null)
const page_creation = ref(null)

const handleCreate = () => {

    page_connexion.value.$el.classList.add('flip');
    setTimeout(() => {
        createAccount.value = true
        page_connexion.value.$el.classList.remove('flip');

        page_creation.value.$el.classList.add('flip2');

        setTimeout(() => {
            page_creation.value.$el.classList.remove('flip2');
        }, 10);
    }, 300);

}

const handleConnect = () => {

    page_creation.value.$el.classList.add('flip2');
    setTimeout(() => {
        createAccount.value = false
        page_creation.value.$el.classList.remove('flip2');

        page_connexion.value.$el.classList.add('flip');

        setTimeout(() => {
            page_connexion.value.$el.classList.remove('flip');
        }, 10);
    }, 300);

}

</script>

<template>
    <div class="main">
        <FormInscription ref="page_creation" v-show="createAccount" @connectAccount="handleConnect">
        </FormInscription>
        <FormConnexion ref="page_connexion" v-show="!createAccount" @createAccount="handleCreate"></FormConnexion>
    </div>
</template>

<style scoped>
.main {

    background: linear-gradient(45deg, rgba(223, 223, 223, 0) 0%, #CADFF2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1500px;
}


.main>* {
    background-color: white;
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    padding: 60px 80px;
    min-width: 360px;
    height: 55vh;
}

.main>div {
    transition: transform 0.3s linear;
    transform-style: preserve-3d;

}

.flip {
    transform: rotateY(90deg);
}

.flip2 {
    transform: rotateY(-90deg);
}
</style>