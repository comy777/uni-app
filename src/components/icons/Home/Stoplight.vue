<template>
    <svg :width="mobile ? '64' : '87'" :height="mobile ? '52' : '88'" :viewBox="mobile ? '-25 5 110 76' : '-20 -5 98 88'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M21.12 5.5H38.72C47.3467 5.5 54.34 12.4933 54.34 21.12V58.08C54.34 71.5668 43.4068 82.5 29.92 82.5C16.4332 82.5 5.5 71.5668 5.5 58.08V21.12C5.5 12.4933 12.4933 5.5 21.12 5.5Z"
            stroke="url(#paint0_linear_5264_48987)" stroke-width="11" />
        <path
            d="M34.84 24.6388C34.84 27.356 32.6372 29.5588 29.92 29.5588C27.2028 29.5588 25 27.356 25 24.6388C25 21.9215 27.2028 19.7188 29.92 19.7188C32.6372 19.7188 34.84 21.9215 34.84 24.6388Z"
            stroke="url(#paint1_linear_5264_48987)" stroke-width="6" />
        <path
            d="M34.84 44.0001C34.84 46.7173 32.6372 48.9201 29.92 48.9201C27.2028 48.9201 25 46.7173 25 44.0001C25 41.2828 27.2028 39.0801 29.92 39.0801C32.6372 39.0801 34.84 41.2828 34.84 44.0001Z"
            stroke="url(#paint2_linear_5264_48987)" stroke-width="6" />
        <path
            d="M34.84 63.3595C34.84 66.0767 32.6372 68.2795 29.92 68.2795C27.2028 68.2795 25 66.0767 25 63.3595C25 60.6422 27.2028 58.4395 29.92 58.4395C32.6372 58.4395 34.84 60.6422 34.84 63.3595Z"
            stroke="url(#paint3_linear_5264_48987)" stroke-width="6" />
        <defs>
            <linearGradient id="paint0_linear_5264_48987" x1="29.8265" y1="-14.068" x2="29.8265" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint1_linear_5264_48987" x1="29.92" y1="16.7188" x2="29.92" y2="38.9557"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint2_linear_5264_48987" x1="29.92" y1="36.0801" x2="29.92" y2="58.317"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint3_linear_5264_48987" x1="29.92" y1="55.4395" x2="29.92" y2="77.6764"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
        </defs>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Stoplight",
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