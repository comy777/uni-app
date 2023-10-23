<template>
  <el-select
    :class="[width, stylingClasses]"
    class="z-20"
    v-model="vModelValue"
    multiple
    filterable
    default-first-option
    :reserve-keyword="false"
    :placeholder="placeholder"
  >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>

<style>
  .el-scrollbar, .el-scrollbar__view, .el-select-dropdown__list {
    -webkit-overflow-scrolling: touch !important;
  }
  .el-scrollbar__bar {
    opacity: 1 !important;
  }
  .el-input--suffix{
    min-height: 42px !important;
  }

</style>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    width: {
      type: String,
      default: "",
      required: false,
    },
    /** A string with all the desired styling classes (separated by space) */
    stylingClasses: {
      type: String,
      default: "",
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: true,
    },
    /** Should be an array of objects with the form { label: "labelName", value: theValueOfTheOption } */
    options: {
      type: Array as PropType<{label: string, value: any}[]>,
      required: true,
    },
    /** vModelGetter is the function executed to get current state on v-model with Vuex */
    vModelGetter: {
      type: Function,
      required: true,
    },
    /** vModelGetter is the function executed to set current state on v-model with Vuex (with a mutation) */
    vModelSetter: {
      type: Function,
      required: true,
    }
  },

  setup(props) {
    /**
     * This is a "Two-way computed property" very useful for doing custom logic using v-model in Vue 3
     * In this case, the value is get from a Vuex store, and updated by a mutation.
     *
     * Two custom functions (one for Get and one for Set) are used for maximum flexibility
     */
    const vModelValue = computed({
      get() {
        // vModelGetter should execute a query to a Vuex state
        return props.vModelGetter();
      },
      set(value: any) {
        // vModelSetter should execute a Vuex mutation to the 'vModelValue'
        return props.vModelSetter(value);
      },
    });

    const options = computed(() => {
      return props.options;
    });

    const stylingClasses = computed(() => {
      return props.stylingClasses;
    });

    return {
      vModelValue,
      options,
      stylingClasses,
    };
  },
});
</script>
