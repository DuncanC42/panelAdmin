<script setup>

import CustomInput from './CustomInput.vue';
import { ref } from 'vue';

const email = ref('')
const password = ref('')

const emit = defineEmits(['createAccount'])

const handleConnect = ()=>{

}

const handleCreate = ()=>{
    emit('createAccount')
}

</script>

<template>
    <div class="form">
        <h2>Connectez-vous !</h2>
        <CustomInput type="email" placeholder="Email..." id="email" icone="at"></CustomInput>
        <CustomInput type="password" placeholder="Mot de passe..." id="password" icone="lock"></CustomInput>
        <button>Se connecter</button>
        <div class="bar">
            <hr><span>ou</span>
            <hr>
        </div>
        <span class="link">Créer un compte administrateur</span>
    </div>

</template>


<style scoped>
.form {
    width: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
}

.form h2 {
    text-align: center;
    font-weight: 900;
    font-size: xx-large;
}

button {
    background-color: #004fa4;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 50px;
    cursor: pointer;
    width: fit-content;
    box-shadow: 5px 10px 20px 0 rgba(0, 0, 0, 0.2);
    transition:  all 0.3s;
}

button:hover{
    background-color: #003366;
}

button:active:active{
    transform: scale(0.90);
}

.bar{
    display: flex;
    gap:5px;
    align-items: center;

    width: 80%;
}

.bar>hr{
    width: 100%;
}

.link{
    color: rgb(62, 62, 255);
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s;
}

.link:hover{
    color: rgb(0, 0, 255);
}
</style>