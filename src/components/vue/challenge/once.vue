<script setup>
import { onUnmounted, ref } from "vue";
const count = ref(0);
const timer = setInterval(() => {
  count.value++;
}, 1000);

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <span v-once>>Make it never change: {{ count }}</span>
</template>
