<script setup>

const value = defineModel();

const props = defineProps({
    type: String,
    placeholder: String,
    id: String,
    icone: String,
});


const focusInput = (event) => {
    const input = event.currentTarget.querySelector('input');
    if (input) {
        input.focus();
    }
};

</script>

<template>
    <div class="input-container" @click="focusInput">
        <font-awesome-icon :icon="['fas', icone]" class="icon" />
        <input :type="type" :placeholder="placeholder" :id="id" v-model="value" />
    </div>
</template>

<style scoped>
.input-container {
    border: solid rgba(0, 0, 0, 0.7) 2px;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: rgba(0, 0, 0, 0.7);
    width: 100%;
    transition: all 0.3s;
    cursor: pointer;
}

.input-container:focus-within {
    cursor: text;
}

.input-container:focus-within {
    border-color: #004fa4;
    box-shadow: 0 0 7px rgba(0, 79, 164, 0.5);
}

.icon {
    color: rgba(0, 0, 0, 0.7);
    transition: all 0.3s;
}

.input-container:focus-within .icon {
    color: #004fa4;
}

.input-container>input {
    all: unset;
    flex: 1;
    color: black;
    font-size: 16px;
}
</style>