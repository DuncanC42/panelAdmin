<script setup>
import { icon } from '@fortawesome/fontawesome-svg-core';


const value = defineModel()

const props = defineProps({
    type: String,
    placeholder: String,
    id : String,
    icon: String
})

</script>

<template>
    <div>
        <font-awesome-icon :icon="['fas', icon]" />
        <input :type="type" :placeholder="placeholder" :id="id" v-model="value">
    </div>
</template>


<style scoped>

div{
    border : solid black 1px;
    padding: 5px;
    /* deisable navigator default style */
     
    appearance: none;   

}

div>input{
    appearance: none;
}
</style>