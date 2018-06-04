<template>
  <button :type="type" class="button text-button" :disabled="disabled" :class="buttonClasses">
    <span v-if="icon && ['small', 'medium'].includes(size)" class="button-icon" :class="iconClasses"></span><span v-if="hasContent()" class="button-text"><slot /></span>
  </button>
</template>

<script>
import StaticIcon from './StaticIcon';
export default {
  components: { StaticIcon },
  props: {
    'icon': {
      type: String,
      required: false
    },
    'size': {
      type: String,
      required: false,
      default: () => 'medium'
    },
    'type': {
      type: String,
      required: false,
      default: () => 'button'
    },
    'disabled': {
      required: false,
      default: () => false
    }
  },
  computed: {
    buttonClasses() {
      let classes = [];
      classes.push(this.size);
      if (this.icon) {
        classes.push('button-with-icon');
      }
      return classes;
    },
    iconClasses() {
      let classes = [];
      classes.push('icon-' + this.$props.icon);
      return classes;
    }
  },
  methods: {
    hasContent() {
      return this.$slots.default;
    }
  }
};
</script>
