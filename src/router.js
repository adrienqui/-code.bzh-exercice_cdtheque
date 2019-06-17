import Vue from 'vue';
import Router from 'vue-router';
import method from './components/artist/method.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: method,
    }
  ],
});
