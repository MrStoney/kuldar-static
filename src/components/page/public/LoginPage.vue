<template>
  <page>
    <div slot="header" class="centered">
      <div class="digitalcash-logo big"></div>
    </div>
    <static-icon icon="lock" size="big" />
    <h1>Logi sisse</h1>
    <div>
      <text-button @click.native="login">Lahe sisselogimine</text-button>
      <text-button @click.native="idLogin">ID kaart</text-button>
    </div>
  </page>
</template>
<script>
import modals from '@/utils/modals';
import TextButton from '@/components/bits/TextButton';
import StaticIcon from '@/components/bits/StaticIcon';
import Page from '@/components/page/Page';

export default {
  components: { Page, TextButton, StaticIcon },
  methods: {
    idLogin() {
      modals.showSpinner();
      setTimeout(() => {
        modals.showError('Id login failed :P');
      }, 3000);
    },
    login() {
      alert('cool');
    }
  }
};
</script>
