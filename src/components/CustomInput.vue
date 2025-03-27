<script setup>

const value = defineModel()

const props = defineProps({
    type: String,
    placeholder: String,
    id : String,
    icone: String
})

</script>

<template>
    <div>
        <font-awesome-icon :icon="['fas', icone]" />
        <input :type="type" :placeholder="placeholder" :id="id" v-model="value">
    </div>
</template>


<style scoped>

div{
    border : solid rgba(0, 0, 0, 0.7) 2px;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap : 10px;
    color : rgba(0, 0, 0, 0.7);
    width:100%;

}

div>input{
    all: unset;
    border: none;
    color:black;

}

</style>