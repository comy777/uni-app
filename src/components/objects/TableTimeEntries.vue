<template>
    <div v-if="validateScreen" class="overflow-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div class="overflow-y-auto shadow-md sm:rounded-lg">
                <table class="min-w-full">
                    <thead class="bg-gray-100 text-left">
                        <tr>
                            <th v-for="(head, index) in tableHead" :key="index" scope="col"
                                class="py-3 px-6 text-xs font-medium tracking-wider">
                                {{ head.name }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="timeEntry in timeEntries" :key="timeEntry.id"
                            class="border-b odd:bg-white even:bg-gray-50">
                            <td class="py-4 px-6 text-sm font-medium color-701048 whitespace-nowrap">
                                {{ timeEntry?.profile.employee_id }}
                                <i v-if="timeEntry?.files_time_entries?.length"
                                    class="fas fa-paperclip cursor-pointer color-701048 ml-1">{{
                                    timeEntry?.files_time_entries?.length }}</i>
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap">
                                {{
                                timeEntry?.profile.first_name +
                                ' ' +
                                timeEntry?.profile.last_name
                                }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.hours_submitted }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ dateFormatted(timeEntry?.created_at) }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ dateFormatted(timeEntry?.date_submitted) }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.category.name }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.subcategory.name }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.activity.name }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.status_time_entry.name }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.date_approved }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.hours_approved }}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                {{ timeEntry?.rate }}
                            </td>
                            <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                <Menu as="div" class="relative inline-block text-left">
                                    <div>
                                        <MenuButton
                                            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                            
                                            <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                        </MenuButton>
                                    </div>

                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems
                                            class="origin-top-right absolute right-28 bottom-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }">
                                                <a @click="clickHandlerView(timeEntry)" :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]">View Details</a>
                                                </MenuItem>
                                                <MenuItem v-if="!timeEntriesAdmin" v-slot="{ active }">
                                                <a @click="clickHandlerEdit(timeEntry)" :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]">Edit</a>
                                                </MenuItem>
                                                <MenuItem v-if="
                                                    timeEntriesAdmin &&
                                                    timeEntry.status_time_entry.name ==
                                                        'Pending'
                                                " v-slot="{ active }">
                                                <a @click="clickHandlerApprove(timeEntry)" :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]">Approve</a>
                                                </MenuItem>
                                                <MenuItem v-if="
                                                    timeEntriesAdmin &&
                                                    timeEntry.status_time_entry.name ==
                                                        'Pending'
                                                " v-slot="{ active }">
                                                <a @click="clickHandlerDeny(timeEntry)" :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]">Deny</a>
                                                </MenuItem>
                                                <MenuItem v-if="
                                                    timeEntriesAdmin &&
                                                    !(
                                                        timeEntry.status_time_entry.name ==
                                                        'Pending'
                                                    )
                                                " v-slot="{ active }">
                                                <a @click="clickHandlerPending(timeEntry)" :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]">Set as Pending</a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div v-else class="py-4 w-full relative">
        <table class="table-fixed w-full">
            <thead class="bg-gray-100">
                <tr>
                    <th v-for="(head, index) in tableHead" :key="index" align="left"
                        class="py-3 px-6 text-xs font-medium tracking-wider">
                        <div v-if="head.sort" class="dropdown cursor-pointer">
                            {{ head.name }}
                            <div class="dropdown-content">
                                <a @click="sortTableBy(head.name,'asc')">Sort (a to z)</a>
                                <a @click="sortTableBy(head.name,'desc')">Sort (z to a)</a>
                            </div>
                        </div>
                        <div v-else>
                            {{ head.name }}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="timeEntry in timeEntries" :key="timeEntry.id" class="border-b odd:bg-white even:bg-gray-50"
                    align="center">
                    <td class="py-4 text-sm font-medium color-701048 whitespace-normal">
                        {{ timeEntry?.profile.employee_id }}
                        <i v-if="timeEntry?.files_time_entries?.length"
                            class="fas fa-paperclip cursor-pointer color-701048 ml-1">{{
                            timeEntry?.files_time_entries?.length }}</i>
                    </td>
                    <td class="py-4 text-sm text-gray-500 whitespace-normal">
                        {{ timeEntry?.profile.first_name + ' ' + timeEntry?.profile.last_name }}
                    </td>
                    <td class="py-4 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.hours_submitted }}
                    </td>
                    <td class="py-4 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ dateFormatted(timeEntry?.created_at) }}
                    </td>
                    <td class="py-4 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ dateFormatted(timeEntry?.date_submitted) }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.category.name }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.subcategory.name }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.activity.name }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.status_time_entry.name }}
                    </td>
                    <td class="py-4 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.date_approved }}
                    </td>
                    <td class="py-4 px-6 text-sm text-gray-500 whitespace-normal dark:text-gray-400">
                        {{ timeEntry?.hours_approved }}
                    </td>
                    <td>
                        {{ timeEntry?.rate }}
                    </td>
                    <td class="py-4 text-xs font-medium text-right whitespace-normal">
                        <Menu as="div" class="relative inline-block text-left">
                            <div>
                                <MenuButton
                                    class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                    Options
                                    <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </MenuButton>
                            </div>

                            <transition enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95">
                                <MenuItems
                                    class="origin-top-right absolute right-28 bottom-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                                    <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                        <a @click="clickHandlerView(timeEntry)" :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]">View Details</a>
                                        </MenuItem>
                                        <MenuItem v-if="!timeEntriesAdmin" v-slot="{ active }">
                                        <a @click="clickHandlerEdit(timeEntry)" :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]">Edit</a>
                                        </MenuItem>
                                        <MenuItem v-if="
                                            timeEntriesAdmin &&
                                            timeEntry.status_time_entry.name == 'Pending'
                                        " v-slot="{ active }">
                                        <a @click="clickHandlerApprove(timeEntry)" :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]">Approve</a>
                                        </MenuItem>
                                        <MenuItem v-if="
                                            timeEntriesAdmin &&
                                            timeEntry.status_time_entry.name == 'Pending'
                                        " v-slot="{ active }">
                                        <a @click="clickHandlerDeny(timeEntry)" :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]">Deny</a>
                                        </MenuItem>
                                        <MenuItem v-if="
                                            timeEntriesAdmin &&
                                            !(timeEntry.status_time_entry.name == 'Pending')
                                        " v-slot="{ active }">
                                        <a @click="clickHandlerPending(timeEntry)" :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]">Set as Pending</a>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.color-701048 {
    color: #701048;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 8vw;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown:hover .dropdown-content {
    display: block;
}

</style>
<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import {
    getDateFormatted,
    getDateFormattedWithHours,
} from '../../lib/dates/current-date';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon, LinkIcon } from '@heroicons/vue/solid';
export default defineComponent({
    props: {
        clickHandlerEdit: {
            type: Function,
            required: false,
        },
        clickHandlerApprove: {
            type: Function,
            required: false,
        },
        clickHandlerDeny: {
            type: Function,
            required: false,
        },
        clickHandlerPending: {
            type: Function,
            required: false,
        },
        clickHandlerView: {
            type: Function,
            required: true,
        },
        timeEntries: {
            type: [] as PropType<any[]>,
            required: true,
            default: [],
        },
        timeEntriesAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ChevronDownIcon,
        LinkIcon,
    },

    setup(props) {
        const tableHead = [
            { name: 'ID', width: '8px', sort: false },
            { name: 'User', width: '8px', sort: false },
            { name: 'Hours', width: '8px', sort: false },
            { name: 'Entry Date', width: '8px', sort: true },
            { name: 'Date Submmited', width: '8px', sort: true },
            { name: 'Category', width: '8px', sort: true },
            { name: 'Subcategory', width: '8px', sort: true },
            { name: 'Activity', width: '8px', sort: true },
            { name: 'Status', width: '8px', sort: true },
            { name: 'Date Approved', width: '8px', sort: false },
            { name: 'Hours Approved', width: '8px', sort: false },
            { name: 'Rate', width: '8px', sort: false },
            { name: 'Actions', width: '8px', sort: false }
        ];

        const dateFormatted = (date: Date) => {
            return getDateFormatted(date);
        };

        const dateFormattedWithHour = (date: Date) => {
            return getDateFormattedWithHours(date);
        };

        const validateScreen: boolean = window.matchMedia('(max-width: 992px)').matches;

        const sortTableBy = (column = 'activity', sort = 'desc') => {
            props.timeEntries.sort(function (a, b) {
                let textA,textB;
                if(column === 'Status')column = 'status_time_entry';
                if(column === 'Entry Date')column = 'created_at';
                if(column === 'Date Submmited')column = 'date_submitted';

                if(['created_at','date_submitted'].includes(column)){
                    textA = a[column];
                    textB = b[column];
                }else{
                    textA = a[column.toLowerCase()].name.toUpperCase();
                    textB = b[column.toLowerCase()].name.toUpperCase();
                }
                
                if (sort === 'asc') {
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                } else {
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                }

            });
        };

        onMounted(async () => {
            if(location.href.includes("idDenied")){
                let idTimeEntryDenied = location.href.split("=")[1];
                const timeEntryDenied = props.timeEntries.filter((timeEntry: any) => timeEntry.id === idTimeEntryDenied);
                if(timeEntryDenied.length > 0)props.clickHandlerView(timeEntryDenied[0]);
            }
        });
        

        return {
            clickHandlerEdit: props.clickHandlerEdit,
            clickHandlerView: props.clickHandlerView,
            clickHandlerApprove: props.clickHandlerApprove,
            clickHandlerPending: props.clickHandlerPending,
            clickHandlerDeny: props.clickHandlerDeny,
            tableHead,
            validateScreen,
            dateFormatted,
            dateFormattedWithHour,
            sortTableBy
        };

    },
});
</script>
