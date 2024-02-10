<script setup lang='ts'>

import { customRef } from "vue"

/**
 * Implement the composable function
 * Make sure the function works correctly
*/
function useLocalStorage(key: string, initialValue: number) {
    let temp = initialValue;
    const value = customRef<number>((track, trigger) => {
        return {
            get: () => {
                track()
                return Number(localStorage.getItem(key)) ?? initialValue
            },
            set: (value) => {
                if (temp !== value) {
                    temp = value;
                    localStorage.setItem(key, `${value  }`)
                    trigger()
                }

                
            }
        }
    })
    return value
}

const counter = useLocalStorage("counter", 0)

// We can get localStorage by triggering the getter:
console.log(counter.value)

// And we can also set localStorage by triggering the setter:

const update = () => counter.value++;

const remove = () => {
    counter.value = 0;
    localStorage.removeItem("counter")
};

</script>

<template>
    <p>Counter: {{ counter }}</p>
    <button class="tw-button mx-5 select-none" @click="update">
        Update
    </button>
     <button @click="remove" class="tw-button mx-5 select-none">
            remove
        </button>
    
</template>
