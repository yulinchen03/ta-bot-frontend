import { createRouter, createWebHistory } from 'vue-router';
import courses from '../pages/Courses.vue';
import profile from '../pages/Profile.vue';
import notifications from '../pages/Notifications.vue';
import settings from '../pages/Settings.vue';
import helpCenter from '../pages/HelpCenter.vue';
import help from '../pages/Help.vue';
import login from '../pages/Login.vue';
import course from '@/pages/Course.vue';
import editor from '@/pages/DecisionTreeEditor.vue';
import signup from '@/pages/Signup.vue';
import useUserStore from '@/stores/user';
import bot from '@/pages/Bot.vue';
import people from '@/pages/People.vue';
import coursesAdmin from '@/pages/CoursesAdmin.vue';

const routes = [
  {
    name: 'Login',
    path: '/',
    alias: '/login',
    component: login
  },
  {
    name: 'Signup',
    path: '/signup',
    component: signup
  },
  {
    name: 'Courses',
    path: '/courses',
    component: courses
  },
  {
    name: 'CoursesAdmin',
    path: '/courses-admin',
    component: coursesAdmin
  },
  {
    name: 'Notifications',
    path: '/notifications',
    component: notifications
  },
  {
    name: 'Profile',
    path: '/profile',
    component: profile
  },
  {
    name: 'Settings',
    path: '/settings',
    component: settings
  },
  {
    name: 'Settings',
    path: '/settings',
    component: settings
  },
  {
    name: 'HelpCenter',
    path: '/helpcenter',
    component: helpCenter
  },
  {
    name: 'Help',
    path: '/help',
    component: help
  },
  {
    name: 'course',
    path: '/course',
    component: course
  },
  {
    name: 'editor',
    path: '/editor',
    component: editor
  },
  {
    name: 'bot',
    path: '/bot',
    component: bot
  },
  {
    name: 'people',
    path: '/people',
    component: people
  }
];

function Router() {
  const router = new createRouter({
    history: createWebHistory(),
    routes
  });
  return router;
}

const router = Router();

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();

  const publicPages = ['/login', '/signup', '/reset'];
  const authRequired = !publicPages.includes(to.path);
  let loggedIn = !!store.token;
  if (authRequired && !loggedIn) {
    return next({ path: '/login' });
  }

  next();
});

export default router;
