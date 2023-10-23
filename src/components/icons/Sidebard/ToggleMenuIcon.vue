<template>
    <svg :class="mobile ? 'w-12 h-6 ml-0 m-2' : 'w-6 h-6'" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="3" cy="3" r="3" fill="#3C3C3C" />
        <circle cx="3" cy="15" r="3" fill="#3C3C3C" />
        <circle cx="3" cy="27" r="3" fill="#3C3C3C" />
        <circle cx="15" cy="3" r="3" fill="#3C3C3C" />
        <circle cx="15" cy="15" r="3" fill="#3C3C3C" />
        <circle cx="15" cy="27" r="3" fill="#3C3C3C" />
        <circle cx="27" cy="3" r="3" fill="#3C3C3C" />
        <circle cx="27" cy="15" r="3" fill="#3C3C3C" />
        <path
            d="M30 27C30 28.6569 28.6569 30 27 30C25.3431 30 24 28.6569 24 27C24 25.3431 25.3431 24 27 24C28.6569 24 30 25.3431 30 27Z"
            fill="#3C3C3C" />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "ToggleMenuIcon",
    props: {
        mobile: {
            type: Boolean,
            default: false
        }
    }
})
</script>