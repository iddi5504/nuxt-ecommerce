<template>
    <transition name="show">
        <div v-if="toast" class="w-full absolute top-3 left-0 flex justify-center items-center">
            <!-- toast -->
            <div class="text-white bg-green-500 max-w-md break-words text-sm font-semibold p-2 rounded-md">
                <div>{{ toast }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
import productStore from '../store/index'
export default {
    computed: {
        toast() {
            const toastMessage = productStore().$state.toastMessage
            return toastMessage
        }
    }
}
</script>

<style>
.show-enter-active,
.show-leave-active {
    transform: translateY(0);
    opacity: 1;
    transition: 0.5s ease all;
}

.show-leave-to,
.show-enter-from {
    transform: translateY(-200px);
    opacity: 0;
}
</style>