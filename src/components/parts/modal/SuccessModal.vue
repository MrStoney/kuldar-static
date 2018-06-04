<template>
  <modal ref="successModal">
    <div class="modal">
      Success! {{ title }}
    </div>
  </modal>
</template>

<script>
import Modal from '@/components/parts/modal/Modal';

export default {
  components: { Modal },
  data() {
    return {
      title: null
    };
  },
  methods: {
    close() {
      if (this.$refs && this.$refs.successModal) {
        this.$refs.successModal.hide();
      }
    },
    show(data) {
      this.title = null;
      let closeCallback = false;
      for (let i = 0; i < data.length; i++) {
        const el = data[i];
        if ('function' === typeof el) {
          closeCallback = el;
          continue;
        }
        switch (i) {
          case 0:
            this.title = el;
            break;
        }
      }
      setTimeout(() => {
        this.modalOpened = true;
      }, 100);
      setTimeout(this.close, 5000);
      this.$refs.successModal.show(closeCallback);
    }
  }
};
</script>
