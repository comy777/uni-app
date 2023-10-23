<template>
    <div class="absolute top-0 bottom-0 right-0 left-0 md:block z-50" v-if="show || secondShow" @click="setShow"></div>
    <div class="sm:hidden md:block w-24 bg-white relative">
        <div class="absolute top-0 bottom-0 left-0 flex flex-row justify-center w-full">
            <div class="flex flex-col items-center">
                <div @click="handleShowMenu" class="hover:cursor-pointer bg-white mt-7 mb-4">
                    <ToggleMenuIcon />
                </div>
                <div v-if="showMenu">
                    <div v-for="(item, index) in navigation" :key="index">
                        <div v-if="!item.children" @click="() => show = false" class="flex justify-center items-center"
                            :class="classRoute === item.href && 'text-vino bg-gray-200 mt-2 rounded-xl'">
                            <router-link :to="item.href" :class="[
                                classRoute === item.href
                                    ? ''
                                    : 'mt-4 bg-white text-gray-400 hover:text-vino',
                                'group flex flex-col items-center py-2 text-sm font-medium rounded-md',
                            ]">
                                <component :is="item.icon" :class="[
                                    classRoute === item.href
                                        ? 'text-vino'
                                        : 'text-gray-400 group-hover:text-vino',
                                    'h-6 w-6',
                                ]" aria-hidden="true" />
                                <span>{{ item.name }}</span>
                            </router-link>
                        </div>
                        <Menu as="div" v-else class="space-y-1" v-slot="{ open }">
                            <MenuButton @click="() => setShowMenu(item)" :class="[
                                item.current
                                    ? ' text-vino'
                                    : 'mt-4 bg-white text-gray-400 hover:text-vino',
                                'group w-full flex flex-col items-center pr-2 py-2 text-sm font-medium rounded-md',
                            ]">
                                <component :is="item.icon" :class="[
                                    classRoute === item.href
                                        ? ' text-vino'
                                        : 'text-gray-400 group-hover:text-vino',
                                    'h-6 w-6',
                                ]" aria-hidden="true" />
                                <span class="ml-2 capitalize">{{ item.name }}</span>
                                <Arrow />
                            </MenuButton>

                            <div :class="[show || secondShow ? 'absolute top-0 bottom-0 right-0' : '']">
                                <div v-show="item.show == 'first' ? show : secondShow" class="
                                            absolute
                                            right-0
                                            py-2
                                            mt-2bg-indigo-500
                                            bg-white
                                            rounded-md
                                            shadow-xl
                                            w-44
                                            left-[7%]
                                            lg:left-[8%]
                                            xl:left-[7%]
                                            2xl:left-[6%]
                                        " :class="item.name === 'WRVU'
                                            ? 'top-[25%]'
                                            : stoplightUser ? 'top-72'
                                                : 'top-[480px]'" style="z-index: 1000">
                                    <div v-for="subItem in item.children" :key="subItem.name" @click="() => show = false"
                                        class="flex">
                                        <router-link :to="subItem.href"
                                            class="flex px-4 py-2 text-sm hover:bg-gray-200 w-full">
                                            <div class="flex items-center justify-center">
                                                <component :is="subItem.icon" :class="[
                                                    item.current ? ' text-vino' : 'text-gray-400 ',
                                                    'h-6 w-6',
                                                ]" aria-hidden="true" />
                                                <div class="ml-6">
                                                    <span class="capitalize text-center">{{
                                                        subItem.name
                                                    }}</span>
                                                </div>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="showMenu && mobile">
        <Dialog as="div" class="fixed inset-0 z-50 flex sm:mt-0 md:mt-0" @close="handleShowMenu">
            <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
                leave-to="opacity-0">
                <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </TransitionChild>
            <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                enter-from="-translate-x-full" enter-to="translate-x-0"
                leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                leave-to="-translate-x-full">
                <div class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
                    <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                        enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                        leave-to="opacity-0">
                        <div class="absolute right-0 p-1 top-1 -mr-14 sm:mt-4 md:mt-0">
                            <button type="button" class="
                                        flex
                                        items-center
                                        justify-center
                                        w-12
                                        h-12
                                        rounded-full
                                        focus:outline-none focus:ring-2 focus:ring-white
                                    " @click="handleShowMenu">
                                <span class="text-white font-bold">X</span>
                            </button>
                        </div>
                    </TransitionChild>
                    <div class="flex-1 h-0 px-2 mt-5 overflow-y-auto">
                        <nav class="flex flex-col h-full">
                            <template v-for="item in navigation" :key="item.name">
                                <div v-if="!item.children" @click="handleShowMenu">
                                    <router-link :to="item.href" :class="[
                                        item.current
                                            ? ' text-vino'
                                            : 'mt-4 bg-white text-gray-400 hover:text-vino',
                                        'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md',
                                    ]">
                                        <component :is="item.icon" :class="[
                                            item.current
                                                ? 'text-vino'
                                                : 'text-gray-400 group-hover:text-vino',
                                            'h-6 w-6',
                                        ]" aria-hidden="true" />
                                        <span class="ml-2 capitalize">{{ item.name }}</span>
                                    </router-link>
                                </div>
                                <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }">
                                    <DisclosureButton :class="[
                                        item.current
                                            ? ' text-vino'
                                            : 'mt-4 bg-white text-gray-400 hover:text-vino',
                                        'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md',
                                    ]">
                                        <component :is="item.icon" :class="[
                                            item.current
                                                ? ' text-vino'
                                                : 'text-gray-400 group-hover:text-vino',
                                            'h-6 w-6',
                                        ]" aria-hidden="true" />
                                        <span class="ml-2 capitalize">{{ item.name }}</span>
                                        <svg :class="[
                                            open ? 'text-gray-400 rotate-90' : 'text-gray-400',
                                            'flex-shrink-0 ml-auto h-5 w-5 transform group-hover:text-vino transition-colors ease-in-out duration-150',
                                        ]" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                                        </svg>
                                    </DisclosureButton>
                                    <DisclosurePanel class="space-y-1">
                                        <div v-for="subItem in item.children" :key="subItem.name">
                                            <DisclosureButton as="div">
                                                <router-link :to="subItem.href">
                                                    <div class="
                                                        flex
                                                        items-center
                                                        w-full
                                                        py-2
                                                        pl-10
                                                        pr-2
                                                        text-sm
                                                        font-medium
                                                        text-gray-600
                                                        group
                                                        rounded-md
                                                        hover:text-gray-900 hover:bg-gray-50
                                                    " @click="handleShowMenu">
                                                        <component :is="subItem.icon" :class="[
                                                            item.current
                                                                ? ' text-vino'
                                                                : 'text-gray-400 group-hover:text-vino',
                                                            'h-6 w-6',
                                                        ]" aria-hidden="true" />
                                                        <span class="ml-2 capitalize">{{ subItem.name }}
                                                        </span>
                                                    </div>
                                                </router-link>
                                            </DisclosureButton>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>
                            </template>
                        </nav>
                    </div>
                </div>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>
  
<style>
#Sidebar {
    box-shadow: -3px 0px 13px 0px;
}
</style>
  
<script lang="ts">
// Vue imports
import { ref, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

// Lib
import ToggleMenuIcon from '../icons/Sidebard/ToggleMenuIcon.vue';

// UI & Icons
import {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/vue';

// Components
import Arrow from '../icons/Sidebard/Arrow.vue';


export default defineComponent({
    components: {
        Arrow,
        Dialog,
        DialogOverlay,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        ToggleMenuIcon
    },
    setup() {
        const store = useStore();
        const userRol: string = localStorage.getItem('user_role');
        const route = useRoute();
        const classRoute = ref(route.fullPath);
        const position = ref('other')
        const navigation = ref([])
        const loading = ref(false)
        const routeHome = ref(true)
        const showMenu = ref(store.getters['ui/getShowMenu'])
        const mobile = ref(store.getters['ui/getmobileBrowser'])
        const stoplightUser = ref(false)
        const show = ref(false)
        const secondShow = ref(false)


        const handleShowMenu = () => store.commit('ui/setShowMenu')

        const setShow = () => {
            show.value = false;
            secondShow.value = false;
        }

        const setShowMenu = (item: any) => {
            item.show === 'first' ? show.value = !show.value : secondShow.value = !secondShow.value
            if (show.value && secondShow.value) {
                item.show === 'first' ? secondShow.value = false : show.value = false
            }
        }

        watch(route, () => {
            const { fullPath } = route
            classRoute.value = fullPath
            routeHome.value = fullPath === '/' ? true : false
            setShow()
        })

        watch(store.state.ui, () => showMenu.value = store.state.ui.showMenu)

        return {
            navigation,
            userRol,
            classRoute,
            position,
            loading,
            routeHome,
            showMenu,
            mobile,
            stoplightUser,
            show,
            secondShow,
            handleShowMenu,
            setShow,
            setShowMenu
        };
    },
});
</script>