<template>
  <div class="sm:w-96 md:w-full h-full py-5 p-3 md:p-0">
    <div class="bg-[#351C35] h-full rounded-xl overflow-auto">
      <div class="sticky top-0 bg-[#351C35] z-10">
        <div class="flex justify-between p-3">
          <LinkIcon class="text-white h-10 w-8" /><span class="text-white font-bold py-2 justify-center flex">{{ title }}</span>
          <button>
            <ThreePointsIcon class="text-white h-5 w-5 justify-left" @click="addNewNote()" />
          </button>
        </div>
      </div>
      <form class="p-2" v-if="addNoteActive" @submit.prevent="handleSubmit">
        <div class="mb-3">
          <span class="text-white">Tittle:</span>
          <input v-model="newNote.description" type="text" class="border-b border-white bg-transparent w-full text-white placeholder-white" />
        </div>
        <div class="mb-3">
          <span class="text-white">link:</span>
          <input v-model="newNote.link" type="text" class="border-b border-white bg-transparent w-full text-white placeholder-white" />
        </div>
        <div class="flex justify-center">
          <button type="submit" class="border-solid border-2 rounded-xl">
            <PlusIcon class="text-white h-5 w-5 justify-left" @click="addNewNote()" />
          </button>
        </div>
      </form>
      <div class="p-3 overflow-auto" v-for="(note, index) in dataNotes" :key="index">
        <div class="text-white font-bold">{{ note.description }}</div>
        <div class="text-white">
          <a :href="note.title" target="_blank">{{ note.title }}</a>
        </div>
        <hr class="border-dotted" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';

import { LinkIcon } from '@heroicons/vue/solid';
import { PlusIcon } from '@heroicons/vue/outline';
import ThreePointsIcon from '../icons/ThreePoints.vue';
import { v4 as uuid } from 'uuid';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    LinkIcon,
    PlusIcon,
    ThreePointsIcon,
  },

  props: {
    title: {
      type: String,
    },
  },

  setup(props) {
    const newNote = ref({
      description: '',
      link: '',
      id: '',
    });
    const user_id = ref('');
    const addNoteActive = ref(false);
    const dataNotes = ref([]);
    const type = 'link';
    const store = useStore();

    const reminder = computed(() => {
      const data = store.getters['ui/getReminder'];
      return data;
    });

    const addNewNote = () => {
      addNoteActive.value = !addNoteActive.value;
    };

    const handleSubmit = async () => {
      const id = uuid();
      const { link, description } = newNote.value;
      if (!link && !description) return;
      newNote.value.id = id;
      console.log(newNote.value);
      dataNotes.value.push(newNote.value);
      const data = dataNotes.value;
      localStorage.setItem('links', JSON.stringify(data));
      newNote.value = { link: '', description: '', id: '' };
    };

    const getDataLinks = async () => {
      const dataJSON = localStorage.getItem('links');
      const data = JSON.parse(dataJSON);
      console.log('🚀 ~ file: BookmarksWidget.vue:88 ~ getDataLinks ~ data:', data);
      if (data) dataNotes.value = data;
    };

    watch(reminder, () => {
      addNoteActive.value = true;
      const { title, url } = reminder.value;
      const id = uuid();
      newNote.value = { link: url, description: title, id };
    });

    onMounted(() => {
      user_id.value = localStorage.getItem('user_id');
      getDataLinks();
    });

    return {
      addNoteActive,
      addNewNote,
      handleSubmit,
      newNote,
      dataNotes,
    };
  },
});
</script>
