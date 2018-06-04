<template>
  <div class="modal-overlay" :class="{'appearing': appearing, 'disappearing': disappearing}" :style="fadeStyle">
    <slot>Here will be a modal component</slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
      shown: false,
      appearing: false,
      disappearing: false,
      fadeStyle: {}
    };
  },
  methods: {
    hide() {
      const self = this;
      if (self.disappearing) {
        return;
      }

      if (self.appearing) {
        clearTimeout(self.appearingTimeout);
        self.appearing = false;
      }

      self.disappearing = true;

      // This timeouts are used to create an animation when hiding the modal.
      self.$nextTick(() => {
        self.fadeStyle = {'display': 'flex'};
      });
      self.disappearingTimeout = setTimeout(() => {
        self.fadeStyle = {};
        self.disappearing = false;
        self.shown = false;
        if (self.closeCallback) {
          self.closeCallback();
        }
      }, 200);
    },
    show(closeCallback) {
      const self = this;
      if (self.appearing) {
        return;
      }
      self.closeCallback = closeCallback;

      self.appearing = true;
      if (self.disappearing) {
        clearTimeout(self.disappearingTimeout);
        self.disappearing = false;
        self.shown = true;
        self.fadeStyle = {'display': 'flex', 'opacity': '1'};
      }
      else {
        self.fadeStyle = {'display': 'flex'};
        self.appearingTimeout = setTimeout(() => {
          self.shown = true;
          // this starts the fade-in
          self.fadeStyle = {'display': 'flex', 'opacity': '1'};
        }, 100);
      }
    },
    close() {
      this.hide();
    }
  }
};
</script>
