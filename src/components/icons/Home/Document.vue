<template>
    <svg :width="mobile ? '64' : '87'" :height="mobile ? '52' : '88'" :viewBox="mobile ? '-20 5 110 76' : '-10 -10 87 98'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M38 44C40.2091 44 42 45.7909 42 48C42 50.2091 40.2091 52 38 52L22 52C19.7909 52 18 50.2091 18 48C18 45.7909 19.7909 44 22 44L38 44Z"
            fill="url(#paint0_linear_5037_37363)" />
        <path
            d="M50 56C52.2091 56 54 57.7909 54 60C54 62.2091 52.2091 64 50 64H22C19.7909 64 18 62.2091 18 60C18 57.7909 19.7909 56 22 56L50 56Z"
            fill="url(#paint1_linear_5037_37363)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0 13C0 5.8203 5.8203 0 13 0H59C66.1797 0 72 5.8203 72 13V75C72 82.1797 66.1797 88 59 88H13C5.8203 88 0 82.1797 0 75V13ZM13 10C11.3431 10 10 11.3431 10 13V75C10 76.6569 11.3431 78 13 78H59C60.6569 78 62 76.6569 62 75V13C62 11.3431 60.6569 10 59 10H13Z"
            fill="url(#paint2_linear_5037_37363)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0 13C0 5.8203 5.8203 0 13 0H37V23C37 30.1797 31.1797 36 24 36H0V13ZM13 10C11.3431 10 10 11.3431 10 13V26H24C25.6569 26 27 24.6569 27 23V10H13Z"
            fill="url(#paint3_linear_5037_37363)" />
        <defs>
            <linearGradient id="paint0_linear_5037_37363" x1="36" y1="44" x2="36" y2="72.0769"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint1_linear_5037_37363" x1="54" y1="60" x2="3.46154" y2="60"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint2_linear_5037_37363" x1="35.8876" y1="-14.068" x2="35.8876" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint3_linear_5037_37363" x1="35.8876" y1="-14.068" x2="35.8876" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
        </defs>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        mobile: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        return { props }
    }

})
</script>
