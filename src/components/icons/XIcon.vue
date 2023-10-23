<template>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_3269_34768)">
            <rect x="4" y="2" width="40" height="40" rx="20" fill="white" />
        </g>
        <path
            d="M32.1738 30.1016C31.8574 30.418 31.2773 30.418 30.9609 30.1016L24 23.0879L16.9863 30.1016C16.6699 30.418 16.0898 30.418 15.7734 30.1016C15.457 29.7852 15.457 29.2051 15.7734 28.8887L22.7871 21.875L15.7734 14.9141C15.457 14.5977 15.457 14.0176 15.7734 13.7012C16.0898 13.3848 16.6699 13.3848 16.9863 13.7012L24 20.7148L30.9609 13.7012C31.2773 13.3848 31.8574 13.3848 32.1738 13.7012C32.4902 14.0176 32.4902 14.5977 32.1738 14.9141L25.1602 21.875L32.1738 28.8887C32.4902 29.2051 32.4902 29.7852 32.1738 30.1016Z"
            fill="#3C3C3C" />
        <defs>
            <filter id="filter0_d_3269_34768" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3269_34768" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3269_34768" result="shape" />
            </filter>
        </defs>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'XIcon'
})
</script>