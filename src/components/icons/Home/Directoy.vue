<template>
    <svg :width="mobile ? '62' : '87'" :height="mobile ? '52' : '88'" :viewBox="mobile ? '0 0 72 92' : '-10 -5 98 88'"
        fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M59.7949 10.1538H12.4103C11.1641 10.1538 10.1538 11.1641 10.1538 12.4103V75.5897C10.1538 76.8359 11.1641 77.8462 12.4103 77.8462H59.7949C61.0411 77.8462 62.0513 76.8359 62.0513 75.5897V12.4103C62.0513 11.1641 61.0411 10.1538 59.7949 10.1538ZM12.4103 0C5.55626 0 0 5.55626 0 12.4103V75.5897C0 82.4437 5.55626 88 12.4103 88H59.7949C66.6489 88 72.2051 82.4437 72.2051 75.5897V12.4103C72.2051 5.55626 66.6489 0 59.7949 0H12.4103Z"
            fill="url(#paint0_linear_4840_35921)" />
        <path
            d="M76.7179 11.2821H78.9744C80.8436 11.2821 82.359 12.7974 82.359 14.6667V24.8205C82.359 26.6898 80.8436 28.2051 78.9744 28.2051H76.7179V11.2821Z"
            fill="url(#paint1_linear_4840_35921)" />
        <path
            d="M76.7179 32.7179H78.9744C80.8436 32.7179 82.359 34.2333 82.359 36.1026V46.2564C82.359 48.1257 80.8436 49.641 78.9744 49.641H76.7179V32.7179Z"
            fill="url(#paint2_linear_4840_35921)" />
        <path
            d="M76.7179 54.1538H78.9744C80.8436 54.1538 82.359 55.6692 82.359 57.5385V67.6923C82.359 69.5616 80.8436 71.0769 78.9744 71.0769H76.7179V54.1538Z"
            fill="url(#paint3_linear_4840_35921)" />
        <path
            d="M47.3846 33.8462C47.3846 40.0771 42.3335 45.1282 36.1026 45.1282C29.8717 45.1282 24.8205 40.0771 24.8205 33.8462C24.8205 27.6152 29.8717 22.5641 36.1026 22.5641C42.3335 22.5641 47.3846 27.6152 47.3846 33.8462Z"
            fill="url(#paint4_linear_4840_35921)" />
        <path
            d="M18.0513 63.1795C18.0513 56.3255 23.6075 50.7692 30.4615 50.7692H41.7436C48.5976 50.7692 54.1538 56.3255 54.1538 63.1795C54.1538 64.4257 53.1436 65.4359 51.8974 65.4359H20.3077C19.0615 65.4359 18.0513 64.4257 18.0513 63.1795Z"
            fill="url(#paint5_linear_4840_35921)" />
        <defs>
            <linearGradient id="paint0_linear_4840_35921" x1="41.1795" y1="0" x2="41.1795" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint1_linear_4840_35921" x1="41.1795" y1="0" x2="41.1795" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint2_linear_4840_35921" x1="41.1795" y1="0" x2="41.1795" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint3_linear_4840_35921" x1="41.1795" y1="0" x2="41.1795" y2="123.538"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint4_linear_4840_35921" x1="41.0509" y1="-14.068" x2="41.0509" y2="91.2925"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#D64C7D" />
                <stop offset="1" stop-color="#850C37" />
            </linearGradient>
            <linearGradient id="paint5_linear_4840_35921" x1="41.0509" y1="-14.068" x2="41.0509" y2="91.2925"
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
    name: "Directory",
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