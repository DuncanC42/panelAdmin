<script setup>

import CustomInput from './CustomInput.vue';
import ButtonConnexion from './ButtonConnexion.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { fetchBackend } from '@/composable/fetchBackend';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useTokenStore } from '@/stores/tokenStore';

const router = useRouter()
const tokenStore = useTokenStore();
const email = ref('')
const password = ref('')
const showLoading = inject('showLoading');

const emit = defineEmits(['createAccount'])

const handleConnect = () => {
    showLoading.value = true

    fetchBackend('intranet/login', 'POST', { email: email.value, password: password.value })
        .then(response => {
            if (response.status === 401) {
                toast("Email ou mot de passe incorrect !", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center"
                })
            } else if (response.status === 200) {
                tokenStore.setToken(response.data.token);
                router.push('panel');
            } else {
                toast("Une erreur est survenue lors de la connexion !", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center"
                })
            }
        })
        .finally(() => {
            showLoading.value = false
        })
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