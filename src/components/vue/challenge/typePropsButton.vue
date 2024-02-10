<script setup>
defineProps({
  type: {
    default: "default",
    validator(value) {
      return ["primary", "ghost", "dashed", "link", "text", "default"].includes(
        value
      );
    },
  },
});
</script>

<template>
  <button>Button</button>
</template>
