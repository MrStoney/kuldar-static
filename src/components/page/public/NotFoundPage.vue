<template>
  <page @click.native="toFrontPage">
    <static-icon icon="cancel-circled" size="big" />
    <h2>Seda lehte ei leitud</h2>
  </page>
</template>
<script>
import StaticIcon from '@/components/bits/StaticIcon';
import Page from '@/components/page/Page';

export default {
  components: { StaticIcon, Page },
  methods: {
    toFrontPage() {
      // this.$router.replace('/');
    }
  }
};
</script>
