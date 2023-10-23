<template>
  <div v-for="timeEntry in timeEntries" :key="timeEntry.id"
    class="bg-white rounded-lg border border-gray-200 shadow-md w-full mt-4">
    <div class="flex justify-end px-4 pt-2">
      <Menu as="div" class="relative inline-block text-left">
        <div>
          <MenuButton
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Options
            <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
          enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95">
          <MenuItems
            class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-100">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
              <a @click="clickHandlerView(timeEntry)" :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]">View Details</a>
              </MenuItem>
              <MenuItem v-if="!timeEntriesAdmin" v-slot="{ active }">
              <a @click="() => clickHandlerEdit(timeEntry)" :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]">Edit</a>
              </MenuItem>
              <MenuItem v-if="
                timeEntriesAdmin &&
                (timeEntry.status_time_entry.name == 'Pending')
              " v-slot="{ active }">
              <a @click="clickHandlerApprove(timeEntry)" :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]">Approve</a>
              </MenuItem>
              <MenuItem v-if="
                timeEntriesAdmin &&
                (timeEntry.status_time_entry.name == 'Pending')
              " v-slot="{ active }">
              <a @click="clickHandlerDeny(timeEntry)" :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]">Deny</a>
              </MenuItem>
              <MenuItem v-if="
                timeEntriesAdmin &&
                !(timeEntry.status_time_entry.name == 'Pending')
              " v-slot="{ active }">
              <a @click="clickHandlerPending(timeEntry)" :class="[
                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm',
              ]">Set as Pending</a>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <div class="flex md:flex-row sm:flex-col pb-4 px-4">
      <div class="flex flex-col pb-4 px-4">
        <InitialsContainer :profile-initials="profileInitials" />
        <label class="mb-1 text-md font-medium text-gray-900">
          {{ timeEntry.profile.email }}
        </label>
        <label class="mb-1 text-xl font-medium text-vino">
          {{ timeEntry.profile.employee_id }}
        </label>
      </div>
      <div class="flex flex-col p-4">
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900">
            Hours Submmited:
          </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.hours_submitted }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900"> Category: </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.category.name }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900"> Status: </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.status_time_entry.name
          }}</span>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900"> Entry Date: </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ dateFormatted(timeEntry.created_at)
          }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900">
            Subcategory:
          </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.subcategory.name
          }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900">
            Date Approved
          </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.date_approved }}</span>
        </div>
      </div>
      <div class="flex flex-col p-4">
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900">
            Submmited on:
          </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.subcategory.name
          }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900"> Activity: </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.activity.name }}</span>
        </div>
        <div class="flex flex-row px-4 py-2">
          <label class="text-sm font-medium text-gray-900">
            Hours Approved
          </label>
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-4 self-center">{{ timeEntry.hours_approved }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType } from "vue";
import {
  getCurrentDate,
  getCurrentYear,
  getCurrentMonth,
  getQuarter,
  getDateFormatted,
  getDateFormattedWithHours,
} from "../../lib/dates/current-date";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { ChevronDownIcon, LinkIcon } from "@heroicons/vue/solid";
import InitialsContainer from "./containers/InitialsContainer.vue";
import { setFullName } from "../../lib/users/string-manager";
import { sleep } from '../../utils/sleep';
import { useStore } from "vuex";
import { TimeEntryResponse } from '../../interfaces/response';

export default defineComponent({
  props: {
    clickHandlerEdit: {
      type: Function,
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
      type: Array as PropType<TimeEntryResponse[]>,
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
    InitialsContainer
  },

  setup(props) {
    const store = useStore()
    const profileInitials = ref<string>("");

    onMounted(() => {
      store.dispatch('events/fetchEvents');
      getProfileInitials();
    })

    async function getProfileInitials() {
      let currentUser: any = localStorage.getItem("user");
      if (currentUser) {
        profileInitials.value = setFullName(currentUser);
      } else {
        for (let i = 1; i < 6; i++) {
          console.log(`[AlertIconsHeader]Waiting ${i} seconds...`);
          await sleep(i * 1000).then(() => {
            currentUser = localStorage.getItem("user");
            if (currentUser) {
              profileInitials.value = setFullName(currentUser);
              i = 6;
            }
          })
            .catch((e) => {
              console.log(e);
            });
        }
      }
      if (!profileInitials.value) profileInitials.value = "??";
    }
    const tableHead = [
      { name: "ID", width: "8px" },
      { name: "User", width: "8px" },
      { name: "Hours", width: "8px" },
      { name: "Entry Date", width: "8px" },
      { name: "Date Submmited", width: "8px" },
      { name: "Category", width: "8px" },
      { name: "Subcategory", width: "8px" },
      { name: "Activity", width: "8px" },
      { name: "Status", width: "8px" },
      { name: "Date Approved", width: "8px" },
      { name: "Hours Approved", width: "8px" },
      { name: "Actions", width: "8px" },
    ];

    const dateFormatted = (date: Date) => {
      return getDateFormatted(date);
    };

    const dateFormattedWithHour = (date: Date) => {
      return getDateFormattedWithHours(date);
    };

    return {
      clickHandlerEdit: props.clickHandlerEdit,
      clickHandlerView: props.clickHandlerView,
      clickHandlerApprove: props.clickHandlerApprove,
      clickHandlerDeny: props.clickHandlerDeny,
      clickHandlerPending: props.clickHandlerPending,
      tableHead,
      profileInitials,
      dateFormatted,
      dateFormattedWithHour,
    };
  },
});
</script>
