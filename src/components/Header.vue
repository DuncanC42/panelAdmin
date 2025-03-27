<script setup>

defineProps({
    isConnected: {
        type: Boolean,
        default: false
    }
})


</script>


<template>
    <header>
        <img src="@/assets/logo_cpam.jpg" alt="logo" />
        <div v-if="!isConnected" class="status blue">
            <div>
                <font-awesome-icon :icon="['fas', 'info']" />
            </div>
            <span>Déconnecté</span>
        </div>
        <div v-else class="status red">
            <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" />
            <span>Se déconnecter</span>
        </div>
    </header>

</template>

<style scoped>
header>img {
    height: 10vh;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 50px;
}

.status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: large;
}

.status>div {
    padding: 5px;
    background-color: rgb(51, 51, 255);
    border-radius: 50%;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: small;
}

.blue {
    color: rgb(51, 51, 255);
}

.red {
    color: red;
    cursor: pointer;
    transition: color 0.3s;
}

.red:hover {
    color: rgb(185, 0, 0);
}

</style>