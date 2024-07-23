<script setup>
import { ref, vModelText } from "vue";

const value = ref("");
vModelText.beforeUpdate = (el, binding) => {
  if (el.value && binding.modifiers.capitalize) {
    el.value = el.value.charAt(0).toUpperCase() + el.value.slice(1);
  }
};
</script>

<template>
  <input
    placeholder="请输入"
    class="appearance-none inline px-5 mx-5"
    type="password"
    v-model.capitalize="value"
  />
  <span class="bg-[#998877] mx-5 text-skin-blue">{{ value }}</span>
</template>
