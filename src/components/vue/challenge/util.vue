<script setup lang='ts'>
import { onUnmounted, ref } from "vue"

const count = ref(0)

/**
 * Implement the until function
*/

function until(initial) {
    function toBe(value) {
        return new Promise((resolve, reject) => {
            if (initial.value === value) {
                resolve(true)
            } else {
                setTimeout(() => {
                    toBe(value).then(resolve).catch(reject)
                }, 100)
            }
        })
    }

    return {
        toBe,
    }
}

let timer: NodeJS.Timeout;

async function increase() {
    count.value = 0
    timer = setInterval(() => {
        count.value++
    }, 1000)
    await until(count).toBe(3)
    console.log(count.value === 3) // Make sure the output is true
}

onUnmounted(() => {
    clearInterval(timer)
})

</script>

<template>
    <p @click="increase">
        Increase{{ count }}
    </p>
</template>
