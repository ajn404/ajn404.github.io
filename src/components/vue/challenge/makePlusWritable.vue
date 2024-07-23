<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";

const count = ref(1);

/**
 * Make the `plusOne` writable.
 * So that we can get the result `plusOne` to be 3, and `count` to be 2.
 */

const stop = () => {
    clearInterval(timer);
};

const reset = () => {
    stop();
    count.value = 1;
    timer = setInterval(() => {
        plusOne.value++;
    }, 1000);
};

const plusOne = computed({
    get: () => count.value + 1,
    set: val => {
        if (val <= 10) count.value = val - 1;
        else stop();
    }
}, {
    onTrack: (e) => {
        // debugger;
        console.log("onTrack", e)
    },
    onTrigger: (e) => {
        // debugger;
        console.log("onTrigger", e)
    }
});

let timer = setInterval(() => {
    plusOne.value++;
}, 1000);

onUnmounted(() => {
    clearInterval(timer);
});
</script>

<template>
    <div class="grid grid-cols-2 gap-5">
        <div class="bg-skin-purple text-skin-orange px-5 border
">plusOne</div>
        <div class="bg-skin-purple text-skin-orange px-5 border">count
        </div>
    </div>
    <div class="grid grid-cols-2 gap-5">
        <div class="bg-skin-purple text-skin-orange px-5 border">{{ plusOne }}</div>
        <div class="bg-skin-purple text-skin-orange px-5 border">{{ count }}</div>
    </div>
    <button @click="reset" :class="[plusOne < 10 && 'invisible']" class="bg-skin-purple  w-full mt-10 text-skin-orange px-5 hover:bg-skin-orange hover:text-skin-purple border">
        reset
    </button>
</template>
