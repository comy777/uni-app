<template>
    <svg :width="mobile ? '62' : '87'" :height="mobile ? '52' : '88'" :viewBox="mobile ? '0 0 72 92' : '0 0 98 88'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M22.6286 45.2571C22.6286 43.1742 24.3171 41.4857 26.4 41.4857C28.4829 41.4857 30.1714 43.1742 30.1714 45.2571V61.6C30.1714 63.6829 28.4829 65.3714 26.4 65.3714C24.3171 65.3714 22.6286 63.6829 22.6286 61.6V45.2571Z"
            fill="url(#paint0_linear_4840_35927)" />
        <path
            d="M41.4857 20.1143C41.4857 18.0314 43.1742 16.3429 45.2571 16.3429C47.34 16.3429 49.0286 18.0314 49.0286 20.1143V61.6C49.0286 63.6829 47.34 65.3714 45.2571 65.3714C43.1742 65.3714 41.4857 63.6829 41.4857 61.6V20.1143Z"
            fill="url(#paint1_linear_4840_35927)" />
        <path
            d="M60.3429 33.9429C60.3429 31.86 62.0314 30.1714 64.1143 30.1714C66.1972 30.1714 67.8857 31.86 67.8857 33.9429V61.6C67.8857 63.6829 66.1972 65.3714 64.1143 65.3714C62.0314 65.3714 60.3429 63.6829 60.3429 61.6V33.9429Z"
            fill="url(#paint2_linear_4840_35927)" />
        <path
            d="M79.2 12.5714C79.2 10.4885 80.8885 8.8 82.9714 8.8C85.0543 8.8 86.7429 10.4885 86.7429 12.5714V61.6C86.7429 63.6829 85.0543 65.3714 82.9714 65.3714C80.8885 65.3714 79.2 63.6829 79.2 61.6V12.5714Z"
            fill="url(#paint3_linear_4840_35927)" />
        <path
            d="M0 5.65714C0 2.53279 2.53279 0 5.65714 0C8.7815 0 11.3143 2.53279 11.3143 5.65714C11.3143 5.65714 11.3143 48.9473 11.3143 76.6857C11.3143 81.1042 11.3143 88 11.3143 88C5.06558 88 0 82.9344 0 76.6857V5.65714Z"
            fill="url(#paint4_linear_4840_35927)" />
        <path
            d="M11.3143 82.3429C11.3143 79.2185 11.3143 80.4571 11.3143 78.1392C11.3143 78.1392 11.3143 77.3143 11.3143 76.6857C41.9983 76.6857 89.8857 76.6857 89.8857 76.6857C93.0101 76.6857 95.5429 79.2185 95.5429 82.3429C95.5429 85.4672 93.0101 88 89.8857 88H11.3143C11.3143 84.2286 11.3143 85.4672 11.3143 82.3429Z"
            fill="url(#paint5_linear_4840_35927)" />
        <defs>
            <linearGradient id="paint0_linear_4840_35927" x1="47.6222" y1="-14.068" x2="47.6222" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint1_linear_4840_35927" x1="47.6222" y1="-14.068" x2="47.6222" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint2_linear_4840_35927" x1="47.6222" y1="-14.068" x2="47.6222" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint3_linear_4840_35927" x1="47.6222" y1="-14.068" x2="47.6222" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint4_linear_4840_35927" x1="47.7714" y1="0" x2="47.7714" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint5_linear_4840_35927" x1="47.7714" y1="0" x2="47.7714" y2="123.538"
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
    name: "DashboardIcon",
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