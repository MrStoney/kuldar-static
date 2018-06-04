import Vue from 'vue';

export const bus = new Vue();

export default {
  showSuccess(...args) {
    bus.$emit('hide-spinner');
    bus.$emit('show-success-modal', args);
  },
  showError(...args) {
    bus.$emit('hide-spinner');
    bus.$emit('show-error-modal', args);
  },
  showSpinner() {
    bus.$emit('show-spinner');
  },
  hideSpinner() {
    bus.$emit('hide-spinner');
  }
};
