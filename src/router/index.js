import {createRouter, createWebHistory} from "vue-router";
import courses from '../pages/Courses.vue'
import profile from '../pages/Profile.vue'
import notifications from '../pages/Notifications.vue'
import settings from '../pages/Settings.vue'
import helpCenter from '../pages/HelpCenter.vue'
import help from '../pages/Help.vue'
import login from '../pages/Login.vue'
import course from "@/pages/Course.vue";
import editor from "@/pages/DecisionTreeEditor.vue";
import reset from "@/pages/Reset.vue"
import signup from "@/pages/Signup.vue"
import useUserStore from "@/stores/user";

const routes = [
    {
        name:'Login',
        path:'/',
        alias: '/login',
        component:login,
        // beforeEnter: (to, from, next) => {
        //     next()
        //     //todo prevent access when user is already logged in
        // }
    },
    {
        name:'Reset',
        path:'/reset',
        component: reset,
        // beforeEnter: (to, from, next) => {
        //     // Check if the navigation is from the /courses route
        //     if (from.path === '/login') {
        //         // If true, allow navigation
        //         next();
        //     } else {
        //         // If false, redirect to /courses
        //         next('/login');
        //     }
        // }
    },
    {
        name:'Signup',
        path:'/signup',
        component: signup,
        // beforeEnter: (to, from, next) => {
        //     // Check if the navigation is from the /courses route
        //     if (from.path === '/login') {
        //         // If true, allow navigation
        //         next();
        //     } else {
        //         // If false, redirect to /courses
        //         next('/login');
        //     }
        // }
    },
    {
        name:'Courses',
        path:'/courses',
        component:courses,
    },
    {
        name:'Notifications',
        path:'/notifications',
        component:notifications
    },
    {
        name:'Profile',
        path:'/profile',
        component:profile
    },
    {
        name:'Settings',
        path:'/settings',
        component:settings
    },
    {
        name:'Settings',
        path:'/settings',
        component:settings
    },
    {
        name:'HelpCenter',
        path:'/helpcenter',
        component:helpCenter
    },
    {
        name:'Help',
        path:'/help',
        component:help
    },
    {
        name:'course',
        path:'/course',
        component:course,
        // beforeEnter: (to, from, next) => {
        //     // Check if the navigation is from the /courses route
        //     if (from.path === '/courses' || from.path.includes('/editor')) {
        //         // If true, allow navigation
        //         next();
        //     } else {
        //         // If false, redirect to /courses
        //         next('/courses');
        //     }
        // }
    },
    {
        name:'editor',
        path:'/editor',
        component: editor,
        // beforeEnter: (to, from, next) => {
        //     console.log(to.path)
        //     console.log(from.path)
        //     // Check if the navigation is from the /courses route
        //     if (from.path.includes('/course') || (from.path === '/' && to.path.includes('/editor'))) {
        //         // If true, allow navigation
        //         next();
        //     } else {
        //         // If false, redirect to /courses
        //         next('/courses');
        //     }
        // },

    }
];
const router = Router();

router.beforeEach(async (to, from, next) => {
    const store = useUserStore()

    const publicPages = ['/login', '/signup', '/reset']
    const authRequired = !publicPages.includes(to.path)
    let loggedIn = !!store.token

    if (authRequired && !loggedIn) {
        return next({ name: 'login' })
    }

    next()
})

export default router;
let isAuthenticated = true; // todo implement login authentication

function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
