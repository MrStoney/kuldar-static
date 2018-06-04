<template>
  <modal ref="modal">
    <div class="spinner" :style="fadeStyle">
      <static-icon icon="camera" size="big" class="animation-spin" />
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/parts/modal/Modal';
import StaticIcon from '@/components/bits/StaticIcon';
export default {
  components: { Modal, StaticIcon },
  data() {
    return {
      shown: false,
      fadeStyle: {}
    };
  },
  methods: {
    hide() {
      this.$refs.modal.hide();
    },
    show() {
      this.$refs.modal.show();
    }
  }
};
</script>
