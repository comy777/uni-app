<template>
  <div v-html="sanitizedContent">
  </div>
</template>

<script lang="ts">
import sanitizeHtml from 'sanitize-html';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    // Configure SanitizeHTML to escape disallowed tags and attributes instead of hidding them.
    sanitizeHtml.defaults.disallowedTagsMode = 'escape';

    const sanitizedContent = computed<string>(() => {
      const content: string = sanitizeHtml(props.content);
      return content;
    });

    return {
      sanitizedContent,
    }
  }
});
</script>
