<template>
    <div
        class="flex flex-col justify-center self-center text-center uppercase rounded-full"
        :class="`${fontSize} ${width} ${height} ${bgColor} ${textColor}`"
    >{{ profileInitials }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        profileInitials: {
            type: String,
            required: true
        },

        /** Must be a Tailwind class */
        fontSize: {
            type: String,
            default: 'text-lg'
        },

        /** Must be a Tailwind class */
        width: {
            type: String,
            default: 'w-10'
        },
        
        /** Must be a Tailwind class */
        height: {
            type: String,
            default: 'h-10'
        },

        /** Must be a Tailwind class */
        bgColor: {
            type: String,
            default: 'bg-indigo-600'
        },

        /** Must be a Tailwind class */
        textColor: {
            type: String,
            default: 'text-white'
        },
    },

    setup() {
        return {
        }
    }
});
</script>