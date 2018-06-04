<template>
  <div class="dropdown-button">
    <text-button :disabled="disabled" :size="size" :icon="icon" :class="buttonClasses"
        @click.native="showDropdown"><slot name="default" /></text-button>
    <dropdown v-if="hasDropdown" v-show="dropDownOpen"><slot name="dropdown" /></dropdown>
  </div>
</template>

<script>
import Dropdown from '@/components/bits/Dropdown';
import TextButton from '@/components/bits/TextButton';
export default {
  components: { Dropdown, TextButton },
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
    'disabled': {
      required: false,
      default: () => false
    },
    'close-on-select': {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      dropDownOpen: false
    };
  },
  computed: {
    hasDropdown() {
      return this.$slots.dropdown;
    },
    buttonClasses() {
      if (this.$vnode && this.$vnode.data) {
        return this.$vnode.data.staticClass;
      }
      return '';
    },
    iconClasses() {
      let classes = [];
      classes.push('icon-' + this.$props.icon);
      return classes;
    }
  },
  unmount() {
    document.body.removeEventListener('click', this.hideDropdown);
    document.body.removeEventListener('touchend', this.hideDropdown);
  },
  methods: {
    showDropdown(e) {
      if (!this.hasDropdown) {
        return;
      }
      // this timeout is used, because calling simply e.stopPropagation()
      // fails to close other dropdowns on the same page
      setTimeout(() => {
        this.dropDownOpen = true;
        document.body.addEventListener('click', this.hideDropdown);
        document.body.addEventListener('touchend', this.hideDropdown);
      }, 0);
    },
    hideDropdown(e) {
      if (!this.closeOnSelect || 'touchend' === e.type) {
        try {
          if (e.target.parentNode.parentNode.classList.contains('dropdown')) {
            return;
          }
        }
        catch (e) {}
      }
      document.body.removeEventListener('click', this.hideDropdown);
      document.body.removeEventListener('touchend', this.hideDropdown);
      this.dropDownOpen = false;
    }
  }
};
</script>
