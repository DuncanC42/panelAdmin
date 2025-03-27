<template>
    <button>
        <slot></slot>
    </button>
</template>


<style scoped>
button {
    background-color: #004fa4;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 15px 50px;
    cursor: pointer;
    width: fit-content;
    box-shadow: 5px 7px 20px 0 rgba(0, 0, 0, 0.4);
    transition: all 0.3s;
}

button:hover {
    background-color: #003366;
}

button:active {
    transform: scale(0.90);
}

button:disabled {
    background-color: #4a82bd;
    cursor: not-allowed;
}

button:disabled:active {
    transform: none;
}
</style>