<template>
  <div class="tooltip-container">
    <button class="tooltip-button icon-attention" @click.stop="click"><a class="tooltip">{{ tip }}</a></button>
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    'tip': {
      type: String,
      required: true
    }
  },
  methods: {
    click(e) {
      // just stopping propagation, that's it
    }
  }
};
</script>
