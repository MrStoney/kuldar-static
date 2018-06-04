<template>
  <div id="app">
    <page v-if="!$route.matched.length" class="app-container">
      <not-found-page />
    </page>
    <page v-else-if="loadingLoggedInUser" class="app-container">
       <!-- Before you know whether the user is logged in -->
      <h2>Aitäh, et kasutad Kuldari lahedat rakendust</h2>
    </page>
    <login-page v-else-if="!loggedInUser && !$route.meta.publicRoute" class="app-container" />
    <div v-else class="app-container">
      <top-menu :is-logged-in="null !== loggedInUser" />
      <router-view />
    </div>

    <success-modal ref="successModal" />
    <error-modal ref="errorModal" />
    <spinner ref="spinner" />
  </div>
</template>

<script>
import { authStore, checkLogin } from '@/utils/auth';
import { bus } from '@/utils/modals';
import TopMenu from '@/components/parts/TopMenu';
import SuccessModal from '@/components/parts/modal/SuccessModal';
import ErrorModal from '@/components/parts/modal/ErrorModal';
import Spinner from '@/components/parts/modal/Spinner';
import Page from '@/components/page/Page';
import LoginPage from '@/components/page/public/LoginPage';
import NotFoundPage from '@/components/page/public/NotFoundPage';

const DEFAULT_USER = {
  firstName: 'Kuldar',
  lastName: 'Rosenberg'
};

export default {
  name: 'app',
  components: { TopMenu, SuccessModal, ErrorModal, Spinner, Page, NotFoundPage, LoginPage },
  data() {
    return {
      loadingLoggedInUser: true,
      authStore: authStore,
      loggedInUser: null
    };
  },
  created() {
    bus.$on('show-success-modal', this.showSuccessModal);
    bus.$on('show-error-modal', this.showErrorModal);
    bus.$on('show-spinner', this.showSpinner);
    bus.$on('hide-spinner', this.hideSpinner);
    authStore.user = DEFAULT_USER;
    this.setLoggedInUser();
    checkLogin()
      .then()
      .catch(err => {
        console.log('Login check failed', err);
      }).finally(() => {
        this.loadingLoggedInUser = false;
      });
  },
  beforeDestroy() {
    bus.$off('show-success-modal', this.showSuccessModal);
    bus.$off('show-error-modal', this.showErrorModal);
    bus.$off('show-spinner', this.showSpinner);
    bus.$off('hide-spinner', this.hideSpinner);
  },
  methods: {
    setLoggedInUser() {
      this.loggedInUser = authStore.user;
    },
    showSuccessModal(p) {
      this.$refs.successModal.show(p);
    },
    showErrorModal(p) {
      this.$refs.errorModal.show(p);
    },
    showSpinner() {
      this.$refs.spinner.show();
    },
    hideSpinner() {
      this.$refs.spinner.hide();
    }
  },
  watch: {
    'authStore.user'(user) {
      console.log('user updated', user);
      this.setLoggedInUser();
    }
  }
};
</script>
<style lang="scss" src="@/visual/scss/main.scss"></style>
<style scoped>
#app {
  width: 100%;
}
</style>
