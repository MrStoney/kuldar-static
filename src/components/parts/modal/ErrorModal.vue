<template>
  <modal ref="errorModal">
    <div class="modal error">
      <static-icon icon="quote-circled" />
      Viga! {{ title }}
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
      title: null
    };
  },
  methods: {
    close() {
      if (this.$refs && this.$refs.errorModal) {
        this.$refs.errorModal.hide();
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
        else if ('object' === typeof el) {
          if (el.message) {
            let err = el;
            console.log('showing error modal', err);
            if (err.response && err.response.data && err.response.data.errorCode) {
              this.footer = err.response.data.errorCode;
            }
            else {
              this.footer = err.message;
            }
            continue;
          }
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
      this.$refs.errorModal.show(closeCallback);
    }
  }
};
</script>
