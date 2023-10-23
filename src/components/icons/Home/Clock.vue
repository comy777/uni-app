<template>
    <svg :width="mobile ? '62' : '87'" :height="mobile ? '52' : '88'" :viewBox="mobile ? '0 0 72 92' : '-5 -5 87 98'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M43.4568 78.1C61.8718 78.1 77.012 62.9507 77.012 44C77.012 25.0493 61.8718 9.9 43.4568 9.9C25.0418 9.9 9.90155 25.0493 9.90155 44C9.90155 62.9507 25.0418 78.1 43.4568 78.1ZM43.4568 88C67.4573 88 86.9136 68.3005 86.9136 44C86.9136 19.6995 67.4573 0 43.4568 0C19.4563 0 0 19.6995 0 44C0 68.3005 19.4563 88 43.4568 88Z"
            fill="url(#paint0_linear_4840_35924)" />
        <path
            d="M39.1111 23.8562C39.1111 21.481 41.0366 19.5556 43.4118 19.5556C45.787 19.5556 47.7125 21.481 47.7125 23.8562V44.1933C47.1834 43.6642 45.6296 41.6606 43.4118 41.6606C41.0366 41.6606 39.1111 43.4568 39.1111 45.9741V23.8562Z"
            fill="url(#paint1_linear_4840_35924)" />
        <path
            d="M62.0791 58.5599C63.7586 60.2394 63.7586 62.9624 62.079 64.642C60.3995 66.3215 57.6765 66.3215 55.997 64.642L40.3573 49.0023C38.6778 47.3228 38.6778 44.5997 40.3573 42.9202C42.0368 41.2407 44.5432 41.2839 46.4394 42.9202L62.0791 58.5599Z"
            fill="url(#paint2_linear_4840_35924)" />
        <defs>
            <linearGradient id="paint0_linear_4840_35924" x1="43.4568" y1="0" x2="43.4568" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint1_linear_4840_35924" x1="43.3211" y1="-14.068" x2="43.3211" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint2_linear_4840_35924" x1="43.3211" y1="-14.068" x2="43.3211" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
        </defs>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "Clock",
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