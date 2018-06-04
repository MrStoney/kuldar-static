<template>
  <button :type="type" class="button image-button">
    <static-icon class="button-icon" :icon="icon"></static-icon>
    <span v-if="hasContent()" class="button-text"><slot /></span>
    <span v-else class="button-text">&nbsp;</span>
  </button>
</template>

<script>
import StaticIcon from './StaticIcon';
export default {
  components: { StaticIcon },
  props: {
    'icon': {
      type: String,
      required: true
    },
    'type': {
      type: String,
      required: false,
      default: () => 'button'
    }
  },
  methods: {
    hasContent() {
      return this.$slots.default;
    }
  }
};
</script>
