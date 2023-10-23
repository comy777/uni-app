<template>
  <Modal v-model="modalViewDetails" @updateModalValue="toggleModalViewDetails"  title="Time Entry Details">
      <template v-slot:content>
        <table class="min-w-full">
          <tbody>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Employee Id
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.profile.employee_id }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Category
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.category.name }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Date submitted
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.date_submitted}}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Subategory
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.subcategory.name }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Activity
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.activity.name }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Date Ocurred
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ dateFormatted(timeEntrySelectedDetails.created_at) }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Date Submmited
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.date_submitted }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Hours Submmited
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.hours_submitted }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Date Approved
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.date_approved }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Hours Approved
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ timeEntrySelectedDetails.hours_approved }}
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Status
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                <button
                  type="button"
                  :class="
                    timeEntrySelectedDetails.status_time_entry.name == 'Pending'
                      ? 'text-red-700 bg-red-100'
                      : 'text-green-700 bg-green-100 '
                  "
                  class="text-sm hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
                >
                  <svg
                    class="-ml-0.5 mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  {{ timeEntrySelectedDetails.status_time_entry.name }}
                </button>
              </td>
            </tr>
            <tr class="border-b odd:bg-white even:bg-gray-50">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                Activity Logs
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ }}
              </td>
            </tr>
            <tr v-for="activityLog in timeEntrySelectedDetails.activity_logs" :key="activityLog" class="border-b odd:bg-white even:bg-gray-50 wrap">
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap"
              >
                {{ dateFormattedWithHour(activityLog.created_at) }}
              </td>
              <td
                class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-normal"
              >
                <label>{{ activityLog.profile.first_name }} </label>
                <label class="ml-2">{{ activityLog.profile.last_name }}</label>

                <p>Notes: {{ activityLog.name }}</p>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="!timeEntriesAdmin" class="ml-4 mt-2 flex-shrink-0">
          <button
            type="submit"
            class="mt-5 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="clickHandlerDelete(timeEntrySelectedDetails.id)"
          >
            Delete
          </button>
        </div>
        <div v-if="timeEntriesAdmin" class="ml-4 mt-2 flex-shrink-0">
          <button
            type="submit"
              class="mt-5 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="clickHandlerApprove(timeEntrySelectedDetails.id)"
          >
            Approved
          </button>
          <button
            type="submit"
            class="mt-5 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="clickHandlerDeny(timeEntrySelectedDetails.id)"
          >
            Denied
          </button>
        </div>
      </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import {
  getDateFormatted,
  getDateFormattedWithHours
} from "../../lib/dates/current-date";
import Modal from "../../components/objects/ModalSimple.vue";

export default defineComponent({
  props: {
    clickHandlerDelete: {
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
    timeEntrySelectedDetails: {
      type: Object,
      required: true,
      default: {},
    },
    modalViewDetails: {
      type: Boolean,
      required: true,
      default: false,
    },
    timeEntriesAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    Modal
  },

  emits: ["updateModalValueView"],

  setup(props, { emit }) {

    let { modalViewDetails } = reactive(props)
    const modalViewDetailsValue = ref(modalViewDetails)
    console.log(timeEntrySelectedDetails);
    

    const dateFormattedWithHour = (date: Date) => {
      return getDateFormattedWithHours(date);
    };

    const dateFormatted = (date: Date) => {
      return getDateFormatted(date);
    };

    // const closeModal = () => {
    //   emit("updateModalValueView", false);
    // }

    function toggleModalViewDetails(value: boolean) {
      // console.log('cerrar');
      emit("updateModalValueView", false);
      // modalViewDetailsValue = false;
    }

    return {
      clickHandlerDelete: props.clickHandlerDelete,
      clickHandlerApprove: props.clickHandlerApprove,
      clickHandlerDeny: props.clickHandlerDeny,
      modalViewDetailsValue,

      dateFormattedWithHour,
      dateFormatted,
      // closeModal,
      toggleModalViewDetails
    };
  },
});
</script>
