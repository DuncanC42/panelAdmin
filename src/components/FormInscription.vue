<script setup>

import CustomInput from './CustomInput.vue';
import ButtonConnexion from './ButtonConnexion.vue';
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { fetchBackend } from '@/composable/fetchBackend';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const router = useRouter()
const email = ref('')
const password = ref('')
const password_check = ref('')
const key = ref('')
const showLoading = inject('showLoading');

const emit = defineEmits(['connectAccount'])

const handleCreate = () => {
    if (password.value !== password_check.value) {
        toast("Les mots de passe saisient sont différents !", {
            "theme": "colored",
            "type": "error",
            "position": "top-center"
        })
        return
    }
    if (password.value.length < 8) {
        toast("Le mot de passe doit faire au moins 8 caractères !", {
            "theme": "colored",
            "type": "error",
            "position": "top-center"
        })
        return
    }
    showLoading.value = true

    fetchBackend('intranet/register', 'POST', { email: email.value, password: password.value })
        .then(response => {
            if (response.status === 409) {
                toast("L'email est déjà utilisé !", {
                    "theme": "colored",
                    "type": "error",
                    "position": "top-center"
                })
            } else if (response.status === 201) {
                toast("Votre compte a été créé avec succès !", {
                    "theme": "colored",
                    "type": "success",
                    "position": "top-center"
                })
                emit('connectAccount')
            } else {
                toast("Une erreur est survenue lors de la création du compte !", {
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