import {createRouter, createWebHistory} from "vue-router";
import courses from '../pages/Courses.vue'
import profile from '../pages/Profile.vue'
import messages from '../pages/Messages.vue'
import settings from '../pages/Settings.vue'
import helpCenter from '../pages/HelpCenter.vue'
import help from '../pages/Help.vue'
import login from '../pages/Login.vue'
import course from "@/pages/Course.vue";

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
        component:courses
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
        component:course

    }
];
const router = Router();
export default router;

function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}