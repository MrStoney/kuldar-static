<template>
  <li class="dropdown-item" :class="classes"><slot /></li>
</template>

<script>
export default {
  props: {
    'icon': {
      type: String,
      required: false
    }
  },
  computed: {
    classes() {
      let classes = [];
      if (this.$props.icon) {
        classes.push('icon-' + this.$props.icon);
      }
      return classes;
    }
  }
};
</script>
