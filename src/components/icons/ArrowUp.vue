<template>
    <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.709 8.11523C15.6094 8.24805 15.4766 8.28125 15.3438 8.28125C15.2109 8.28125 15.0781 8.24805 14.9785 8.14844L8.4375 2.10547L1.86328 8.11523C1.66406 8.31445 1.33203 8.31445 1.13281 8.08203C0.933594 7.88281 0.933594 7.55078 1.16602 7.35156L8.07227 0.976562C8.27148 0.777344 8.57031 0.777344 8.76953 0.976562L15.6758 7.35156C15.9082 7.58398 15.9082 7.91602 15.709 8.11523Z"
            :fill="fill ? fill : '#831070'"
        />
    </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ArrowUp',
    props: {
        fill: String
    },
    setup(props){
        return { props }
    }
});
</script>