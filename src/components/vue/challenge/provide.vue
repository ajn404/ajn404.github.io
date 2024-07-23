<script setup lang="ts">
import Inject from "./inject.vue";
import { ref, provide, onUnmounted } from "vue";
const base = ref(1);
const count = ref("1");
const countNumber = ref(1);
provide("count", count);
provide("countNumber", countNumber);
provide("base", base);

const timer = setInterval(() => {
  if (base.value < 100) {
    base.value++;
    count.value +="+"+ base.value;
    countNumber.value += base.value;
  } else {
    clearInterval(timer);
  }
}, 1000);
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <Inject />
</template>
