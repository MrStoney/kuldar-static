<template>
  <div class="top-menu">
    <a v-if="showLogo" class="digitalcash-logo" href="/" @click.prevent="goToFront"></a>
    <icon-button v-if="isLoggedIn" class="logout-button" :class="logoutClasses" icon="cancel-circled" @click.native="logout">Log out</icon-button>
    <!-- Mobile layout buttons -->
    <icon-button v-if="showBack" class="back-button" @click.native="goBack" icon="back-mob" size="big" />
    <icon-button v-if="showBack" class="home-button" @click.native="goToFront" icon="home-mob" size="big" />
  </div>
</template>

<script>
import { doLogout } from '@/utils/auth';
import IconButton from '@/components/bits/IconButton';

export default {
  components: { IconButton },
  props: {
    'is-logged-in': {
      required: true,
      type: Boolean
    }
  },
  computed: {
    showBack() {
      return !['/'].includes(this.$route.path);
    },
    showLogo() {
      return !['/'].includes(this.$route.path) && !this.$route.meta.publicRoute;
    },
    logoutClasses() {
      return '/' === this.$route.path ? ['front-page-logout'] : [];
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    logout() {
      doLogout();
    },
    goToFront() {
      this.$router.push('/');
    }
  }
};
</script>
