<template>
  <div class="p-2 w-full pt-4 flex md:rounded-l-full">
    <ToggleMenuIconVue @click="openMenuMobile()" class="block md:hidden cursor-pointer ml-[40%]" :mobile="true" />
    <div class="flex items-center rounded-full w-full md:py-2">
      <div v-show="!deskMenuOpen" :mobile="true">
        <ToggleMenuIconVue @click="openMenuDesk()" class="md:block mx-2 hidden cursor-pointer ml-[40%]" />
      </div>
      <!--SearchIcon class="mx-1 ml-4"/>
      <input 
        type="search" 
        placeholder="Search case manager..."
        class="p-2 bg-[#F5F4F4] outline-none w-[90%]"
      /-->
    </div>
  </div>
</template>


<script lang="ts">
// Vue & dependencies
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from 'vuex'
import { useAuth0 } from '@auth0/auth0-vue';
import jwt_decode from "jwt-decode";
// Custom components
import ToggleMenuIconVue from "../icons/Sidebard/ToggleMenuIcon.vue";
import AlertIconsHeader from "../alerts/AlertIconsHeader.vue";
import SearchIcon from "../icons/SearchIcon.vue"

export default defineComponent({
  components: {
    ToggleMenuIconVue,
    AlertIconsHeader,
    SearchIcon,
  },

  setup() {
    const { getAccessTokenSilently } = useAuth0();
    const store = useStore()

    let mobileMenuOpen = store.state.mobileMenuOpen;
    let deskMenuOpen = computed(() => store.state.deskMenuOpen)

    const openMenuMobile = () => {
      store.commit("toggleMenuMobile")
    }

    const openMenuDesk = () => {
      store.commit("toggleMenuDesk")
    }

    const doSomethingWithToken = async () => {
      const token = await getAccessTokenSilently();
      localStorage.setItem("access_token", token);
      const decoded: any = jwt_decode(token);
      localStorage.setItem("user_id", decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"]);
      localStorage.setItem("set_localstorage_header", 'true');
    }

    onMounted(() => {
      doSomethingWithToken();
    })

    return {
      deskMenuOpen,
      mobileMenuOpen,
      openMenuMobile,
      openMenuDesk,
      getAccessTokenSilently,
    };
  },
});
</script>
