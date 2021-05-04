import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import store from '@/store';


const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
    component: () => import(/* webpackChunkName: "BasicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      {
        path: 'hotels',
        name: 'Hotels',
        component: () => import(/* webpackChunkName: "Hotels" */ '../views/Hotels/index.vue'),
      },
      {
        path: 'hotels/:id',
        name: 'HotelDetail',
        component: () => import(/* webpackChunkName: "HotelDetail" */ '../views/HotelDetail/index.vue'),
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "User" */ '../views/Users/index.vue'),
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "Log" */ '../views/Log/index.vue'),
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "ResetPassword" */ '../views/ResetPassword/index.vue'),
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "InviteCode" */ '../views/InviteCode/index.vue'),
      },
      {
        path: 'hotel-classify',
        name: 'HotelClassify',
        component: () => import(/* webpackChunkName: "HotelClassify" */ '../views/HotelClassify/index.vue'),
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile/index.vue'),
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/Dashboard/index.vue'),
      },
    ],
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path === '/auth') {
    next();
    return;
  }

  let res = {};
  try {
    res = await user.info();
  } catch {
    if (e.message.includes('code 401')) {
      res.code = 401;
    }
  };

  const { code } = res;

  if (code === 401) {
    if (to.path === '/auth') {
      next();
      return;
    }

    message.error("认证失败，请重新登录");
    next('/auth');

    return;
  };

  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo');
  }

  const reqArr = [];

  if (!store.state.userInfo.account) {
    reqArr.push(store.dispatch('getUserInfo'));
  }

  if (!store.state.hotelClassify.length) {
    reqArr.push(store.dispatch('getHotelClassify'));
  }

  await Promise.all(reqArr);

  if (to.path === '/auth') {
    next('/hotels');
    return;
  }

  next();
})

export default router;
