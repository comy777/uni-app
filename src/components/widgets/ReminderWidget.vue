<template>
  <div class="p-3 md:p-0">
    <div class="flex items-center py-4 pl-8 bg-white">
      <h1 class="text-3xl mr-4">{{ title }}</h1>
    </div>
    <div class="bg-white h-[60vh] md:w-[50vw] sm:w-full">
      <div class="flex h-full w-full">
        <div class="bg-gray-200 md:w-[30%] h-[100%] rounded-tl-3xl rounded-bl-3xl flex md:p-4 sm:p-2">
          <div>
            <div class="py-2 px-4 flex items-center rounded-2xl md:w-40 sm:w-12 my-2 cursor-pointer" :class="filter === value.value && 'bg-gray-100'" @click="() => setFilters(value.value)" v-for="(value, i) in icons" :key="i">
              <component v-bind:is="value.icon" />
              <span class="ml-4 md:block sm:hidden">{{ value.name }}</span>
            </div>
          </div>
        </div>
        <div class="sm:w-full md:w-[55%] overflow-y-scroll rounded-tr-3xl rounded-br-3xl bg-gray-100 py-4 md:px-8 sm:px-4">
          <div class="my-4" v-for="(reminder, i) in reminders" :key="i">
            <div class="flex relative justify-between">
              <div>
                <div class="cursor-pointer w-4">
                  <div class="absolute top-0" @click="() => completeReminder(reminder.id)">
                    <CompletedIcon />
                  </div>
                </div>
                <div class="ml-8 cursor-pointer" @click="() => resetForm(reminder)">
                  <div>
                    {{ reminder.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-model="modal" title="Notice" :preview-media="true" :close-modal="setModal">
    <template v-slot:content>
      <div class="flex justify-center mt-8">
        <div class="md:w-[50vw] sm:w-[80%] bg-white rounded-2xl p-4">
          <div>
            <div class="mt-2 p-2">
              <label>Title</label>
              <input class="p-2 my-1 w-full" v-model="form.title" placeholder="Title" />
            </div>
            <div class="flex justify-center items-center">
              <img :src="form.image" class="h-48 w-full object-contain" />
            </div>
            <div class="mt-2 p-2">
              <label>Description</label>
              <div class="p-2 my-1 border rounded-sm border-gray-300 w-full">
                {{ form.reminder }}
              </div>
            </div>
            <div class="ml-4 mt-2 flex-shrink-0 float-right">
              <button class="mt-5 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-vino hover:bg-vino focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vino mx-4" :disabled="!form.url ? true : false" @click="() => copyDataInfo()">Copy</button>
              <div class="mt-5 relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-vino hover:bg-vino focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vino" :disabled="!form.url ? true : false">
                <a :href="form.url" target="_blank">Go</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeMount } from 'vue';
import AllIcon from '../icons/widgets/All.vue';
import CalendarIcon from '../icons/widgets/Calendar.vue';
import CompletedIcon from '../icons/widgets/Completed.vue';
import ReminderIcon from '../icons/widgets/Reminder.vue';
import Modal from '../objects/Modal.vue';
import { getFormatDateMessageConversation } from '../../lib/dates/formatting';
import { queryApi } from '../../utils/api';
import { Article, IResponse } from '../../interfaces/interfaces';
import { v4 as uuid } from 'uuid';
import { useStore } from 'vuex';
import { hardwareData, softwareData } from '../../utils/data';

export default defineComponent({
  name: 'Reminder widget',

  components: { AllIcon, CalendarIcon, CompletedIcon, ReminderIcon, Modal },

  props: {
    title: {
      type: String,
    },
  },

  setup(props) {
    const modal = ref(false);
    const form = ref({ reminder: '', title: '', image: '', url: '' });
    const loading = ref(false);
    const reminders = ref([]);
    const user_id = '';
    const filters = ref({ all: [], completed: [], today: [], active: 'today' });
    const allReminders = ref([]);
    const filter = ref('today');
    const btnTitle = ref('Save');
    const editReminder = ref('');
    const data = ref<Article[]>([]);
    const store = useStore();

    const icons = [
      { name: 'Hoy', icon: CalendarIcon, value: 'today' },
      { name: 'Leidos', icon: CompletedIcon, value: 'complete' },
      { name: 'Todo', icon: AllIcon, value: 'all' },
    ];

    const resetForm = (reminder?: any) => {
      form.value = {
        reminder: reminder ? reminder.description : '',
        title: reminder ? reminder.title : '',
        image: reminder ? reminder.urlToImage : '',
        url: reminder ? reminder.url : '',
      };
      modal.value = reminder ? true : false;
      btnTitle.value = reminder ? 'Update' : 'Save';
      editReminder.value = reminder ? reminder.id : '';
    };

    const handleEditReminder = async (id: string) => {
      const { reminder, title } = form.value;
      btnTitle.value = 'Updating';
      loading.value = false;
      const newReminders = reminders.value.map((value) => (value.id === id ? { ...value, title, description: reminder } : value));
      const allData = allReminders.value.map((value) => (value.id === id ? { ...value, title, description: reminder } : value));
      reminders.value = newReminders;
      allReminders.value = allData;
      resetForm();
    };

    const handleSubmit = async (e: Event) => {
      e.preventDefault();
      if (!user_id) return;
      if (!form.value.reminder || !form.value.title) return;
      loading.value = true;
      if (editReminder.value) return await handleEditReminder(editReminder.value);
      btnTitle.value = 'Saving';
      const { reminder, title } = form.value;
      loading.value = false;
      setFilters(filter.value);
      resetForm();
    };

    const setFilters = (value: string) => {
      filter.value = value;
      const response = allReminders.value.filter((reminder) => {
        if (value === 'complete') return reminder.completed;
        if (value === 'today' && !reminder.completed) {
          const { updated_at } = reminder;
          const resp = getFormatDateMessageConversation(updated_at, true);
          if (resp.includes('Today')) return { ...reminder, updated_at: resp };
        }
      });
      const data = allReminders.value;
      filters.value = { all: data, today: data, completed: response, active: value };
      if (value === 'all') reminders.value = data;
      if (value === 'complete' || value === 'today') reminders.value = response;
    };

    const completeReminder = async (id: string) => {
      let complete = false;
      const result = allReminders.value.map((value) => (value.id === id ? { ...value, completed: !value.completed } : value));
      allReminders.value = result;
      reminders.value = reminders.value.map((value) => {
        if (value.id === id) {
          complete = !value.completed;
          return { ...value, completed: !value.completed };
        }
        return value;
      });
      setFilters(filter.value);
    };

    const get_reminders = async () => {
      if (!user_id) return;
      setFilters('today');
    };

    const setModal = () => (modal.value = !modal.value);

    const setDateReminder = (updated_at: string) => {
      return getFormatDateMessageConversation(updated_at, true);
    };

    const getData = async () => {
      const resp = props.title === 'Hardware' ? hardwareData() : softwareData();
      if (!resp) return;
      const { articles } = resp;
      reminders.value = articles.map((value) => {
        const id = uuid();
        return { ...value, completed: false, id };
      });
      allReminders.value = reminders.value;
    };

    const copyDataInfo = () => {
      const { title, url } = form.value;
      if (!title && !url) return;
      store.commit('ui/setReminder', form.value);
    };

    onBeforeMount(async () => {
      await getData();
      get_reminders();
    });

    return {
      modal,
      loading,
      form,
      reminders,
      icons,
      filter,
      btnTitle,
      editReminder,
      data,
      handleSubmit,
      setModal,
      setDateReminder,
      setFilters,
      completeReminder,
      resetForm,
      handleEditReminder,
      copyDataInfo,
    };
  },
});
</script>
