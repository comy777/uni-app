<template>
   <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
         d="M1.13281 1.16797C1.23242 1.03516 1.36523 0.96875 1.53125 0.96875C1.63086 0.96875 1.76367 1.00195 1.86328 1.10156L8.4043 7.11133L14.9785 1.10156C15.1777 0.902344 15.5098 0.902344 15.709 1.13477C15.9082 1.33398 15.9082 1.66602 15.6758 1.86523L8.76953 8.24023C8.57031 8.43945 8.27148 8.43945 8.07227 8.24023L1.16602 1.86523C0.933594 1.69922 0.933594 1.36719 1.13281 1.16797Z"
         :fill="color ? color : 'black'"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ArrowDown',

  props: {
    color: {
      type: String
    }
  },

  setup(props){
    return { props }
  }
});
</script>