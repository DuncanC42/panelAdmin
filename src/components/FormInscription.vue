<script setup>

import CustomInput from './CustomInput.vue';
import ButtonConnexion from './ButtonConnexion.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref('')
const password = ref('')
const password_check = ref('')
const key = ref('')
const showLoading = inject('showLoading');

const emit = defineEmits(['connectAccount'])

const handleCreate = () => {
    showLoading.value = true
    setTimeout(() => {
        router.push('panel')
    }, 1000)
}

const handleConnect = () => {
    emit('connectAccount')
}

</script>

<template>
    <div class="form">
        <h2>Créer un nouveau compte !</h2>
        <CustomInput type="email" placeholder="Email..." id="email" icone="at" v-model="email"></CustomInput>
        <CustomInput type="password" placeholder="Mot de passe..." id="password" icone="lock" v-model="password">
        </CustomInput>
        <CustomInput type="password" placeholder="Confirmer le mot de passe..." id="password_check" icone="lock"
            v-model="password_check">
        </CustomInput>
        <CustomInput type="password" placeholder="Chaine d'authentification..." id="key" icone="key" v-model="key">
        </CustomInput>
        <ButtonConnexion @click="handleCreate" :disabled="!password || !email || !password_check || !key">Créer le
            compte</ButtonConnexion>
        <div class="bar">
            <hr>
            <span>ou</span>
            <hr>
        </div>
        <span class="link" @click="handleConnect">Se connecter à un compte existant</span>
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