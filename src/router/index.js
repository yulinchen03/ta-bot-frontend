import {createRouter, createWebHistory} from "vue-router";
import courses from '../pages/Courses.vue'
import profile from '../pages/Profile.vue'
import messages from '../pages/Messages.vue'
import settings from '../pages/Settings.vue'
import helpCenter from '../pages/HelpCenter.vue'
import help from '../pages/Help.vue'
import login from '../pages/Login.vue'
import course from "@/pages/Course.vue";
import editor from "@/pages/DecisionTreeEditor.vue";

const routes = [
    {
        name:'Login',
        path:'/',
        alias: '/login',
        component:login
    },
    {
        name:'Courses',
        path:'/courses',
        component:courses,
    },
    {
        name:'Messages',
        path:'/messages',
        component:messages
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
        beforeEnter: (to, from, next) => {
            console.log(to.path)
            console.log(from.path)
            // Check if the navigation is from the /courses route
            if (from.path === '/courses' || from.path.includes('/editor')) {
                // If true, allow navigation
                next();
            } else {
                // If false, redirect to /courses
                next('/courses');
            }
        }
    },
    {
        name:'editor',
        path:'/editor',
        component: editor,
        beforeEnter: (to, from, next) => {
            console.log(to.path)
            console.log(from.path)
            // Check if the navigation is from the /courses route
            if (from.path.includes('/course') || (from.path === '/' && to.path.includes('/editor'))) {
                // If true, allow navigation
                next();
            } else {
                // If false, redirect to /courses
                next('/courses');
            }
        },

    }
];
const router = Router();
export default router;
let isAuthenticated = true; // todo implement login authentication

function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}

// Prevents back navigation back to login
// router.beforeEach((to, from, next) => {
//     // Redirect if user is disallowed to view the page
//     const isLogged = !! store.getters.getUser
//     if (isLogged && to.meta.disallowAuthed) {
//         return router.push('/my-redirect-page')
//     }
//
//     return next()
// })

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})