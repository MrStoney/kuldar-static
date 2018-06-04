<template>
  <vue-recaptcha
    class="recaptcha-container"
    :sitekey="siteKey"
    ref="recaptcha"
    badge="inline"
    @verify="verified"
    @expired="expired" />
</template>
<script>
import VueRecaptcha from 'vue-recaptcha'
import { configuration } from '@/configuration'

export default {
  components: { VueRecaptcha },
  props: {
    verify: {
      type: Function
    }
  },
  data() {
    return {
      response: null
    }
  },
  computed: {
    siteKey() {
      return configuration.recaptchaSiteKey
    }
  },
  methods: {
    verified(response) {
      this.response = response
      if (this.verify) {
        this.verify(response)
      }
    },
    reset() {
      this.response = null
      this.$refs.recaptcha.reset()
    },
    expired() {
      this.reset()
    },
    isVerified() {
      return this.response !== null
    },
    getResponse() {
      return this.$data.response
    }
  }
}
</script>
<style>
.recaptcha-container {
  margin-bottom: 20px;
}
</style>
