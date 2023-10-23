<template>
    <svg id="Arrow" :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-400', 'flex-shrink-0 h-5 w-5 transform group-hover:text-vino transition-colors ease-in-out duration-150']"
        viewBox="0 0 20 20" aria-hidden="true">
        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
    </svg>
</template>


<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Arrow",
})
</script>