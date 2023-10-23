<template>
    <svg :class="mobile ? '': 'mt-2'" :width="mobile ? '62' : '80'" :height="mobile ? '52' : '80'" :viewBox="mobile ? '0 0 96 92' : '0 0 100 89'"
    fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0.236342 18.5635C0.703107 13.6331 4.93056 10 9.83875 10H23.002V22H12.021C11.8752 26.1479 12.3983 32.6934 15.8815 39.079C19.9098 46.464 28.4145 54.5892 47.1082 58.1033L44.8913 69.8967C23.1875 65.8168 11.3422 55.8166 5.34684 44.8254C-0.466709 34.1677 -0.278793 23.4912 0.236342 18.5635Z"
            fill="url(#paint0_linear_4840_36589)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M99.7632 18.5635C99.2964 13.6331 95.069 10 90.1608 10H76.9976V22H87.9785C88.1244 26.1479 87.6012 32.6934 84.118 39.079C80.0897 46.464 71.585 54.5892 52.8913 58.1033L55.1083 69.8967C76.812 65.8168 88.6573 55.8166 94.6527 44.8254C100.466 34.1677 100.278 23.4912 99.7632 18.5635Z"
            fill="url(#paint1_linear_4840_36589)" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M25.2426 5.24883C28.3047 1.90448 32.6307 0 37.1652 0H62.8343C67.3688 0 71.6948 1.90448 74.757 5.24884C77.4861 8.22944 78.9998 12.1242 78.9998 16.1655V23.6648L78.8924 26.8265C78.3072 44.0563 69.7943 59.961 55.9998 69.6724V76.0273H63.3228C66.6365 76.0273 69.3228 78.7136 69.3228 82.0273C69.3228 85.341 66.6365 88.0273 63.3228 88.0273H36.6767C33.363 88.0273 30.6767 85.341 30.6767 82.0273C30.6767 78.7136 33.363 76.0273 36.6767 76.0273H43.9998V69.6724C30.2052 59.961 21.6923 44.0563 21.1072 26.8265L20.9998 23.6648V16.1655C20.9998 12.1242 22.5135 8.22944 25.2426 5.24883ZM49.9998 59.2015C60.1224 51.6468 66.452 39.5898 66.8993 26.4192L66.9998 23.461V16.1655C66.9998 15.1241 66.6097 14.1205 65.9065 13.3525C65.1175 12.4907 64.0027 12 62.8343 12H37.1652C35.9968 12 34.8821 12.4907 34.093 13.3525C33.3898 14.1205 32.9998 15.1241 32.9998 16.1655V23.4611L33.1002 26.4192C33.5476 39.5898 39.8771 51.6468 49.9998 59.2015Z"
            fill="url(#paint2_linear_4840_36589)" />
        <defs>
            <linearGradient id="paint0_linear_4840_36589" x1="49.9998" y1="0" x2="49.9998" y2="123.577"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint1_linear_4840_36589" x1="49.9998" y1="0" x2="49.9998" y2="123.577"
                gradientUnits="userSpaceOnUse">
                <stop offset="0.322917" stop-color="#831171" />
                <stop offset="0.640625" stop-color="#5A004C" />
            </linearGradient>
            <linearGradient id="paint2_linear_4840_36589" x1="49.8436" y1="-14.0724" x2="49.8436" y2="91.3208"
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