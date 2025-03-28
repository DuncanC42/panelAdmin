<template>
    <div class="loader">
        <div class="spinner"></div>
        <span class="loading-text">Chargement en cours...</span>
    </div>
</template>

<style scoped>
.loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.3);
    display: flex;
    gap: 50px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(0, 0, 0, 0.1);
    border-top: 5px solid #004fa4;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Animation for the text */
.loading-text {
    font-size: 18px;
    color: #004fa4;
    animation: fade 1.5s ease-in-out infinite;
}

@keyframes fade {

    0%,
    100% {
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }
}
</style>