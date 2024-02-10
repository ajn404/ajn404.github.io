<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from "vue"

const state = ref(false)
const input = ref(null)

/**
 * 实现一个自定义指令,让元素获取焦点
 * 确保当切换`state`时,元素随着状态值获取/失去焦点
 *
*/
const VFocus = {
    updated: (el, binding) => {
        binding.value ? el.focus() : el.blur()
    }
}
let timer = setInterval(() => {
    state.value = !state.value
}, 2000)

onUnmounted(() => {
    clearInterval(timer);
})


onMounted(() => {
    const obs = new IntersectionObserver((entries) => {
        if (!entries || entries.length === 0) return

        if (entries[0].isIntersecting) {
            clearInterval(timer);
            timer = setInterval(() => {
                state.value = !state.value
            }, 2000)
        } else {
            clearInterval(timer);
        }
    })
    obs.observe(input.value)
});



</script>

<template>
    <div class="xing-cao">
        <input v-focus="state" ref="input" type="text" class="focus:bg-skin-blue">
        <p class="text-skin-base">{{ state ? "focus" : "blur" }}</p>
    </div>
</template>

