// Child.vue

<script setup lang="ts">
// 添加代码,使`count`值注入子组件
import { inject } from "vue";
const count = inject("count");
const countNumber = inject("countNumber");
const base = inject("base");
</script>

<template>
    <p class="text-ellipsis overflow-hidden">{{ count }}={{ countNumber }}</p>
    <p class="text-ellipsis overflow-hidden">求和{{ `${base}等于${countNumber}` }}</p>
</template>
