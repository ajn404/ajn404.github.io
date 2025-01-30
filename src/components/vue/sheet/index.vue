<script lang="ts" setup>
import { ref } from "vue";
import BottomSheet from "@douxcode/vue-spring-bottom-sheet";
import "@douxcode/vue-spring-bottom-sheet/dist/style.css";

const bottomSheet = ref<InstanceType<typeof BottomSheet>>();
const open = ref(false);
const maxHeight = ref(0);
const toggle = () => {
    open.value = !open.value;
    if (open.value) {
        bottomSheet.value?.open();
    } else {
        bottomSheet.value?.close();
    }
};
</script>

<template>
    <div class="content">
        <button type="button" @click="toggle">
            {{ open ? "Close" : "Open" }} bottom sheet
        </button>
    </div>
    <BottomSheet class="bg-[#000]" ref="bottomSheet" :blocking="false" :snap-points="[maxHeight / 4, maxHeight / 1.5]"
        @closed="open = false" @max-height="(n) => (maxHeight = n)">
        <template #header>
            <span class="text-[#000]">header</span>
        </template>
        <span class="text-[#000]">body</span>
    </BottomSheet>
</template>
