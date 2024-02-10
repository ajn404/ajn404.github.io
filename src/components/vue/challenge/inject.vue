// Child.vue

<script setup lang="ts">
// 添加代码,使`count`值注入子组件
import { inject } from "vue";
const count = inject("count");
</script>

<template>
  <p class="text-ellipsis overflow-hidden">{{ count }}</p>
</template>
