<template>
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_3269_34784)">
            <rect x="4" y="2" width="40" height="40" rx="20" fill="white" />
        </g>
        <path
            d="M25.1875 19.5H19.25C18.916 19.5 18.6562 19.7969 18.6562 20.0938C18.6562 20.4277 18.916 20.6875 19.25 20.6875H25.1875C25.4844 20.6875 25.7812 20.4277 25.7812 20.0938C25.7812 19.7969 25.4844 19.5 25.1875 19.5ZM33.3145 30.373L28.0449 25.1406C29.2324 23.7676 29.9375 22.0234 29.9375 20.0938C29.9375 15.8633 26.4492 12.375 22.2188 12.375C17.9512 12.375 14.5 15.8633 14.5 20.0938C14.5 24.3613 17.9512 27.8125 22.2188 27.8125C24.1113 27.8125 25.8555 27.1445 27.2285 25.957L32.4609 31.2266C32.5723 31.3379 32.7207 31.375 32.9062 31.375C33.0547 31.375 33.2031 31.3379 33.3145 31.2266C33.5371 31.0039 33.5371 30.5957 33.3145 30.373ZM22.2188 26.625C18.582 26.625 15.6875 23.6934 15.6875 20.0938C15.6875 16.4941 18.582 13.5625 22.2188 13.5625C25.8184 13.5625 28.75 16.4941 28.75 20.0938C28.75 23.7305 25.8184 26.625 22.2188 26.625Z"
            fill="#3C3C3C" />
        <defs>
            <filter id="filter0_d_3269_34784" x="0" y="0" width="48" height="48" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3269_34784" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3269_34784" result="shape" />
            </filter>
        </defs>
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ZoomIn'
})
</script>