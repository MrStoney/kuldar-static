<template>
  <div class="static-icon" :class="iconClasses"><slot /></div>
</template>

<script>
export default {
  props: {
    'icon': {
      required: true,
      type: String
    },
    'size': {
      type: String,
      required: false,
      default: () => 'medium'
    },
    'active': {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    iconClasses() {
      let classes = [];
      classes.push('icon-' + this.$props.icon);
      if (this.$props.size) {
        classes.push(this.$props.size);
      }
      if (this.$props.active) {
        classes.push('active');
      }
      return classes;
    }
  }
};
</script>
