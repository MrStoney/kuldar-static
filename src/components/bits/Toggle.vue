<template>
  <div class="toggle-container">
    <input :id="inputId" :checked="checkedValue" :disabled="disabled" @change="updateValue" type="checkbox">
    <label ref="toggle" class="toggle" :class="{'dragged':isDragged}" :for="inputId" @mousedown="mouseDown">
      <span class="toggle-knob"><span v-if="hasContent" class="knob-label"><slot /></span><span v-else class="knob-label">&nbsp;</span></span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    'checked': {
      type: Boolean,
      default: () => false
    },
    'disabled': {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    inputId() {
      return 'toggle-' + Math.random().toString(36).substring(7);
    },
    hasContent() {
      return this.$slots.default;
    }
  },
  data() {
    return {
      checkedValue: this.$props.checked,
      isDragged: false
    };
  },
  mounted() {
    this.$refs.toggle.addEventListener('touchstart', this.touchStart);
  },
  destroyed() {
    this.$refs.toggle.removeEventListener('touchstart', this.touchStart);
  },
  methods: {
    updateValue(event) {
      this.checkedValue = event.target.checked;
      this.$emit('update:checked', this.checkedValue);
    },
    isChecked() {
      return this.checkedValue;
    },
    mouseDown(e) {
      if (this.disabled) {
        return;
      }
      // these mouseDown and mouseUp handle check with drag
      this.isDragged = true;
      document.body.addEventListener('mouseup', this.mouseUp);
      this.mouseDownX = e.clientX;
    },
    touchStart(e) {
      if (this.disabled) {
        return;
      }
      this.isDragged = true;
      document.body.addEventListener('touchend', this.touchEnd);
      this.touchStartX = e.changedTouches[0].pageX;
    },
    mouseUp(e) {
      this.isDragged = false;
      document.body.removeEventListener('mouseup', this.mouseUp);
      if ('number' === typeof this.mouseDownX) {
        const mouseUpX = e.clientX;
        if (!this.checkedValue && mouseUpX > this.mouseDownX + 5) {
          this.updateValue({target: {checked: true}});
        }
        else if (this.checkedValue && mouseUpX < this.mouseDownX - 5) {
          this.updateValue({target: {checked: false}});
        }
      }
    },
    touchEnd(e) {
      this.isDragged = false;
      document.body.removeEventListener('touchend', this.touchEnd);
      if ('number' === typeof this.touchStartX) {
        const touchEndX = e.changedTouches[0].pageX;
        if (!this.checkedValue && touchEndX > this.touchStartX + 10) {
          this.updateValue({target: {checked: true}});
        }
        else if (this.checkedValue && touchEndX < this.touchStartX - 10) {
          this.updateValue({target: {checked: false}});
        }
      }
    }
  },
  watch: {
    checked(newVal) {
      this.checkedValue = newVal;
    }
  }
};
</script>
