<script setup lang="ts">
import { ref, watch } from "vue";

const count = ref(0);

/**
 * Challenge 1: Watch once
 * Make sure the watch callback only triggers once
 */
const unWatch = watch(count, () => {
    console.log("Only triggered once");
    unWatch();
});

count.value = 1;
setTimeout(() => (count.value = 2));

/**
 * Challenge 2: Watch object
 * Make sure the watch callback is triggered
 */
const state = ref({
    count: 0,
});

watch(
    state,
    () => {
        console.log("The state.count updated");
    },
    { deep: true }
);

state.value.count = 2;

/**
 * Challenge 3: Callback Flush Timing
 * Make sure visited the updated eleRef
 */

const eleRef = ref();
const age = ref(2);
watch(
    age,
    () => {
        console.log(eleRef.value);
    },
    //想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM，你需要指明
    { flush: "post" }
);
//设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行。
age.value = 18;
</script>

<template>
    <div>
        <p>
            count:{{ count }}
        </p>
        <p ref="eleRef">
            age:{{ age }}
        </p>
    </div>
</template>
