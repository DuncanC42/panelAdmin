<script setup>

import CustomInput from './CustomInput.vue';
import ButtonConnexion from './ButtonConnexion.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref('')
const password = ref('')
const showLoading = inject('showLoading');

const emit = defineEmits(['createAccount'])

const handleConnect = () => {
    showLoading.value = true
    setTimeout(() => {
        router.push('panel')
    }, 1000)
}

const handleCreate = () => {
    emit('createAccount')
}

</script>

<template>
    <div class="form">
        <h2>Connectez-vous !</h2>
        <CustomInput type="email" placeholder="Email..." id="email_connexion" icone="at" v-model="email"></CustomInput>
        <CustomInput type="password" placeholder="Mot de passe..." id="password_connexion" icone="lock"
            v-model="password">
        </CustomInput>
        <ButtonConnexion @click="handleConnect" :disabled="!password || !email">Se connecter</ButtonConnexion>
        <div class="bar">
            <hr>
            <span>ou</span>
            <hr>
        </div>
        <span class="link" @click="handleCreate">Créer un compte administrateur</span>
    </div>
</template>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.form h2 {
    text-align: center;
    font-weight: 900;
    font-size: xx-large;
}

.bar {
    display: flex;
    gap: 5px;
    align-items: center;

    width: 80%;
}

.bar>hr {
    width: 100%;
}

.link {
    color: rgb(62, 62, 255);
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s;
}

.link:hover {
    color: rgb(0, 0, 255);
}
</style>