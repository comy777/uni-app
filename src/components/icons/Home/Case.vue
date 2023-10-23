<template>
    <svg :width="mobile ? '62' : '80'" :height="mobile ? '52' : '80'" :viewBox="mobile ? '0 0 72 92' : '-5 0 87 88'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M8.55556 24.6829C8.55556 15.7925 15.7377 8.58537 24.5972 8.58537H53.4722C62.3318 8.58537 69.5139 15.7925 69.5139 24.6829V33.2683C69.5139 42.1587 62.3318 49.3659 53.4722 49.3659H44.9167V74.0488C44.9167 77.605 42.0438 80.4878 38.5 80.4878C34.9562 80.4878 32.0833 77.605 32.0833 74.0488V49.3659H24.5972C15.7377 49.3659 8.55556 42.1587 8.55556 33.2683V24.6829ZM24.5972 19.3171C21.644 19.3171 19.25 21.7194 19.25 24.6829V33.2683C19.25 36.2318 21.644 38.6341 24.5972 38.6341H53.4722C56.4254 38.6341 58.8194 36.2318 58.8194 33.2683V24.6829C58.8194 21.7194 56.4254 19.3171 53.4722 19.3171H24.5972Z"
            fill="url(#paint0_linear_4840_35918)" />
        <path
            d="M27.8056 13.9512C27.8056 21.6563 21.5811 27.9024 13.9028 27.9024C6.22449 27.9024 0 21.6563 0 13.9512C0 6.24617 6.22449 0 13.9028 0C21.5811 0 27.8056 6.24617 27.8056 13.9512Z"
            fill="url(#paint1_linear_4840_35918)" />
        <path
            d="M77 13.9512C77 21.6563 70.7755 27.9024 63.0972 27.9024C55.4189 27.9024 49.1944 21.6563 49.1944 13.9512C49.1944 6.24617 55.4189 0 63.0972 0C70.7755 0 77 6.24617 77 13.9512Z"
            fill="url(#paint2_linear_4840_35918)" />
        <path
            d="M52.4028 74.0488C52.4028 81.7538 46.1783 88 38.5 88C30.8217 88 24.5972 81.7538 24.5972 74.0488C24.5972 66.3437 30.8217 60.0976 38.5 60.0976C46.1783 60.0976 52.4028 66.3437 52.4028 74.0488Z"
            fill="url(#paint3_linear_4840_35918)" />
        <defs>
            <linearGradient id="paint0_linear_4840_35918" x1="38.3797" y1="-14.068" x2="38.3797" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint1_linear_4840_35918" x1="38.5" y1="0" x2="38.5" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint2_linear_4840_35918" x1="38.5" y1="0" x2="38.5" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint3_linear_4840_35918" x1="38.5" y1="0" x2="38.5" y2="123.538"
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
    name: "Case",
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