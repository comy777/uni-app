<template>
  <div v-if="!loading" class="sm:p-0 md:px-2 md:w-full h-full flex justify-center sm:mt-0 bg-white">
    <div class="w-full">
      <div v-if="isWidget" class="md:pr-5 sm:pr-3">
        <!-- GRETTING MESSAGE -->
        <div id="Greeting" class="md:pl-4 pl-8 md:pt-10 md:mb-4 sm:pl-0 md:ml-0 sm:ml-4 sm:mt-4 md:mt-0">
          <h2 v-if="name" class="sm:text-xl md:text-3xl font-semibold md:w-full">Welcome to uni app news</h2>
          <h2 v-else class="text-3xl font-semibold">Hello</h2>
        </div>
        <div class="my-6">
          <div class="min-h-[27vh] max-h-[60vh] h-[11.5rem] md:h-[11.8rem] overflow-x-auto resize-y sm:w-full">
            <NotesWidget title="Mis links" />
          </div>
        </div>

        <div class="sm:block md:flex justify-evenly w-full">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <ReminderWidget title="Software" />
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <ReminderWidget title="Hardware" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// Vue
import { useRouter } from 'vue-router';
import { defineComponent, ref, onMounted, onBeforeMount, computed } from 'vue';

// Components
import CalculatorWidget from '../components/widgets/CalculatorWidget.vue';
import NotesWidget from '../components/widgets/BookmarksWidget.vue';
import ConverterWidget from '../components/widgets/ConverterWidget.vue';

// Icons
import { mobileBrowser } from '../utils/mobile';
import { useStore } from 'vuex';
import ReminderWidget from '../components/widgets/ReminderWidget.vue';

export default defineComponent({
  name: 'home',
  components: {
    NotesWidget,
    ConverterWidget,
    CalculatorWidget,
    ReminderWidget,
  },

  setup() {
    const router = useRouter();
    const name = ref('');
    const userRole = ref('');
    const loading = ref(false);
    const mobile = ref(mobileBrowser());
    const stoplightUser = ref(false);
    const layout = ref([]);
    const gridLayoutFromLocalStorage = ref([]);
    const userId = ref('');
    const isWidget = ref(true);
    const store = useStore();

    const isYakimaUser = computed(() => {
      return store.state.user.isYakimaUser;
    });

    async function setupUserName() {
      name.value = `SS`;
    }

    const moveEvent = (i: any, newX: any, newY: any) => {
      layout.value[i].x = newX;
      layout.value[i].y = newY;
      saveGridConfigurationLocalStorage(layout.value);
    };

    const movedEvent = (i: any, newX: any, newY: any) => {
      layout.value[i].x = newX;
      layout.value[i].y = newY;
      saveGridConfigurationLocalStorage(layout.value);
    };

    const resizeEvent = (i: any, newH: any, newW: any, newHPx: any, newWPx: any) => {
      layout.value[i].w = newW;
      layout.value[i].h = newH;
      saveGridConfigurationLocalStorage(layout.value);
    };

    const layoutBeforeMountEvent = () => {
      if (gridLayoutFromLocalStorage.value.length > 0) {
        layout.value = gridLayoutFromLocalStorage.value[0];
      } else {
        return layout.value;
      }
    };

    const layoutMountedEvent = () => {
      if (gridLayoutFromLocalStorage.value.length > 0) {
        if (gridLayoutFromLocalStorage.value[0][0].user_id === userId.value) {
          layout.value = gridLayoutFromLocalStorage.value[0];
        } else {
          return layout.value;
        }
      }
    };

    const saveGridConfigurationLocalStorage = (config: any) => {
      const eventsFromLocalStorage = JSON.parse(localStorage.getItem('gridLayoutEvents')) || [];

      const existingIndex = eventsFromLocalStorage.findIndex((item: any) => item.id === config.id);

      if (existingIndex !== -1) {
        eventsFromLocalStorage[existingIndex] = config;
      } else {
        eventsFromLocalStorage.push(config);
      }
      localStorage.setItem('gridLayoutEvents', JSON.stringify(eventsFromLocalStorage));
    };
    const getGridLayoutFromLocalStorage = () => {
      const eventsFromLocalStorage = JSON.parse(localStorage.getItem('gridLayoutEvents')) || [];

      return eventsFromLocalStorage;
    };

    const getLayoutToDevice = () => {
      if (mobile.value === true) {
        layout.value = [
          {
            user_id: userId.value,
            x: 0,
            y: 0,
            w: 12,
            h: 8,
            i: '0',
            componentName: 'ChatCardsWidget',
            maxH: '14',
            minH: '8',
            minW: '12',
          },
          {
            user_id: userId.value,
            x: 5,
            y: 0,
            w: 7,
            h: 5,
            i: '1',
            componentName: 'CalculatorWidget',
            maxH: '5',
            minH: '5',
            minW: '7',
          },
          {
            user_id: userId.value,
            x: 0,
            y: 10,
            w: 12,
            h: 14,
            i: '2',
            componentName: 'ReminderWidget',
            maxH: '14',
            minH: '14',
            minW: '9',
          },
          {
            user_id: userId.value,
            x: 0,
            y: 0,
            w: 5,
            h: 5,
            i: '3',
            componentName: 'NotesWidget',
            maxH: '14',
            minH: '5',
            minW: '3',
          },
          {
            user_id: userId.value,
            x: 0,
            y: 8,
            w: 12,
            h: 5,
            i: '4',
            componentName: 'ConverterWidget',
            maxH: '5',
            minH: '5',
            minW: '7',
          },
        ];
      } else {
        layout.value = [
          {
            user_id: userId.value,
            x: 0,
            y: 0,
            w: 5,
            h: 10,
            i: '0',
            componentName: 'ChatCardsWidget',
            maxH: '10',
            minH: '5',
            minW: '5',
          },
          {
            user_id: userId.value,
            x: 5,
            y: 0,
            w: 4,
            h: 5,
            i: '1',
            componentName: 'CalculatorWidget',
            maxH: '5',
            minH: '5',
            minW: '3',
          },
          {
            user_id: userId.value,
            x: 0,
            y: 0,
            w: 9,
            h: 12,
            i: '2',
            componentName: 'ReminderWidget',
            maxH: '5',
            minH: '12',
            minW: '9',
          },
          {
            user_id: userId.value,
            x: 9,
            y: 0,
            w: 3,
            h: 5,
            i: '3',
            componentName: 'NotesWidget',
            maxH: '14',
            minH: '5',
            minW: '3',
          },
          {
            user_id: userId.value,
            x: 5,
            y: 5,
            w: 5,
            h: 5,
            i: '4',
            componentName: 'ConverterWidget',
            maxH: '5',
            minH: '5',
            minW: '3',
          },
        ];
      }
    };
    onBeforeMount(() => {
      layoutBeforeMountEvent();
    });

    onMounted(async () => {
      gridLayoutFromLocalStorage.value = getGridLayoutFromLocalStorage();
      getLayoutToDevice();
      layoutMountedEvent();
      setupUserName();
    });

    return {
      userRole,
      name,
      router,
      loading,
      mobile,
      stoplightUser,
      layout,
      moveEvent,
      movedEvent,
      resizeEvent,
      layoutBeforeMountEvent,
      layoutMountedEvent,
      isWidget,
      isYakimaUser,
    };
  },
});
</script>

<style scoped>
#document {
  margin: 0 334%;
}

#grid__icons {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

#grid__icons_3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

#left-panel {
  width: 118vh;
}

@media screen and (max-width: 1536px) {
  #left-panel {
    width: 118vh;
  }
}

@media screen and (max-width: 1281px) {
  #directory {
    padding-left: 0vh;
  }

  #my_document {
    margin-left: 29vh;
  }
}

@media screen and (min-width: 1365px) {
  #my_document {
    margin-left: 29vh;
  }
}

@media screen and (max-width: 2100px) {
  #directory {
    width: 39rem;
  }
}

@media screen and (max-width: 1024px) {
  #left-panel {
    width: 107vh;
  }

  #directory {
    width: 34rem;
  }
}

@media screen and (max-width: 931px) {
  #directory {
    width: 32rem;
  }
}

@media screen and (max-width: 768px) {
  #document {
    margin: 47% 0;
  }

  #directory {
    width: 6.1rem !important;
  }

  #grid__icons {
    grid-template-columns: repeat(3, minmax(0, 87px));
  }
}

.line {
  height: 2px;
  width: 40%;
  font-weight: 100;
}
</style>
