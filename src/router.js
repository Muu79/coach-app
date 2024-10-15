import { createRouter, createWebHistory } from 'vue-router';
import CoachList from './views/coaches/CoachList.vue';
import CoachRequest from './views/coaches/CoachRequest.vue';
import CoachDetails from './views/coaches/CoachDetails.vue';
import RequestList from './views/requests/RequestList.vue';
import Auth from './views/auth/UserAuth.vue';
import NotFound from './views/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches', name: 'home' },
    {
      path: '/coaches',
      component: CoachList,
      name: 'coaches',
      children: [
        {
          path: '/coaches/request/:id',
          component: CoachRequest,
        },
      ],
    },
    {
      path: '/register',
      component: CoachDetails,
      name: 'register',
      meta: { isAuth: true },
    },
    {
      path: '/requests',
      component: RequestList,
      name: 'requests',
      meta: { isAuth: true, isCoach: true },
    },
    { path: '/auth', component: Auth, meta: { notAuth: true }, name: 'auth' },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function (to) {
  if (to.meta.isAuth && !store.getters.isAuth) {
    console.log('auth-redirect');
    return { path: `/auth` };
  } else if (to.meta.notAuth && store.getters.isAuth) {
    return '/coaches';
  } else if (to.meta.isCoach && !store.getters.isCoach) {
    return { path: '/register' };
  } else if (to.meta.notCoach && store.getters.isCoach) {
    return '/coaches';
  } else {
    console.log('next');
    return true;
  }
});

export default router;
