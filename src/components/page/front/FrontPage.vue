<template>
  <page>
    <div slot="header">
      <h1>Kuldari äpp</h1>
      <div class="digitalcash-logo"></div>
      <div>Tere, {{ user ? user.firstName : 'tundmatu' }}!</div>
      <div class="buttons">
        <text-button @click.native="goToOtherPage" icon="accessibility" size="small">Sinu tegevus 1</text-button>
      </div>
    </div>
  </page>
</template>

<script>
import { authStore } from '@/utils/auth';
import Page from '@/components/page/Page';
import TextButton from '@/components/bits/TextButton';

export default {
  components: { Page, TextButton },
  data() {
    return {
      user: authStore.user
    };
  },
  methods: {
    goToOtherPage() {
      this.$router.push('/mingi/teine/leht');
    }
  }
};
</script>

<style scoped>
.buttons {
  margin-top: 40px;
}
</style>
