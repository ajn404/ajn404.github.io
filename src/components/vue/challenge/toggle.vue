<script setup lang="ts">
import { ref, type Ref } from "vue";

/**
 * Implement a composable function that toggles the state
 * Make the function work correctly
 */
function useToggle(initValue: boolean): [Ref<Boolean>, () => void] {
  const state = ref(initValue);
  return [
    state,
    function () {
      state.value = !state.value;
    },
  ];
}

const [state, toggle] = useToggle(false);
</script>

<template>
  <p>State: {{ state ? "ON" : "OFF" }}</p>
  <p @click="toggle" class="tw-button select-none">Toggle state</p>
</template>
