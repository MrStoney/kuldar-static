import Vue from 'vue';
import Router from 'vue-router';

import FrontPage from '@/components/page/front/FrontPage';
import DemoPage from '@/components/page/DemoPage';
import UserDetailsPage from '@/components/page/user/UserDetailsPage';

Vue.use(Router);

const routes = [
  { path: '/', component: FrontPage },
  { path: '/demo', component: DemoPage, meta: { publicRoute: true } },
  { path: '/mingi/teine/leht', component: UserDetailsPage }
];

const router = new Router({
  mode: 'hash',
  routes,
  beforeEach: function(to, from, next) {
    console.log('routing from ' + from.path + ' to ' + to.path);
    next();
  }
});

export default router;
