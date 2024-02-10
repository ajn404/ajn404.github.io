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
};

const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    if (val <= 10) count.value = val - 1;
    else stop();
  },
});

let timer = setInterval(() => {
  plusOne.value++;
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <div class="flex justify-around">
    <span class="text-skin-base">count:{{ count }}</span>
    &amp;
    <span class="text-skin-base">plusOne:{{ plusOne }}</span>
    <button
      @click="stop"
      :class="[plusOne >= 10 && 'hidden', 'inline']"
      class="bg-skin-purple text-skin-orange px-5"
    >
      stop
    </button>
    <button
      @click="reset"
      :class="[plusOne < 10 && 'hidden']"
      class="bg-skin-purple text-skin-orange px-5"
    >
      reset
    </button>
  </div>
</template>
