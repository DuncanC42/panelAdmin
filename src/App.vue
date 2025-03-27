<script setup>
import { RouterView, useRouter } from 'vue-router';
import { ref, onMounted, provide } from 'vue';
import Header from './components/Header.vue';
import LoadPage from './components/LoadPage.vue';

const showLoading = ref(true);
const router = useRouter();

const hideLoading = () => {
    showLoading.value = true;
    setTimeout(() => {
        showLoading.value = false;
    }, 500); // Updated to 500ms for consistency with animation
};

// Provide the loading state and function to child components
provide('showLoading', showLoading);
provide('hideLoading', hideLoading);

router.beforeEach((to, from, next) => {
    hideLoading();
    next();
});

onMounted(() => {
    hideLoading();
});
</script>

<template>
    <div class="app">
        <Header></Header>
        <RouterView class="main"></RouterView>
        <Transition name="fade" appear>
            <LoadPage v-show="showLoading"></LoadPage>
        </Transition>
    </div>
</template>

<style scoped>
.main {
    height: 90vh;
}

/* Fade animation for LoadPage */
.fade-enter-active {
    transition: opacity 0.1s ease;
}

.fade-leave-active {
    transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>