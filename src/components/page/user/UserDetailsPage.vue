<template>
  <page>
    <h3 v-if="joke">
      {{ joke }}
    </h3>
    <div style="text-align: center;">
      <form-input :value="joke" placeholder="First name" />
      <form-input value="" placeholder="Family name" />
      <form-input value="" placeholder="Date of Birth" />
      <form-input value="" placeholder="National ID code" />
      jne...
    </div>
    <div class="centered">
      <text-button size="small" @click.native="$router.push('/')">Cancel</text-button>
      <text-button size="small" class="primary">Save</text-button>
    </div>
  </page>
</template>
<script>
import { loadNorrisJoke } from '@/api';
import modals from '@/utils/modals';
import Page from '@/components/page/Page';
import TextButton from '@/components/bits/TextButton';
import FormInput from '@/components/bits/FormInput';

export default {
  components: { Page, TextButton, FormInput },
  data() {
    return {
      joke: null
    };
  },
  created() {
    modals.showSpinner();
    loadNorrisJoke()
      .then(result => {
        console.log('random joke', result);
        this.joke = result.value;
      })
      .catch(error => {
        console.log('error loading joke', error);
        modals.showError('Error loading joke', error);
      })
      .finally(modals.hideSpinner);
  }
};
</script>
