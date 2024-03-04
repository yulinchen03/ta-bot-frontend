import {createRouter, createWebHistory} from "vue-router";
import dashboard from '../pages/Dashboard.vue'
import courses from '../pages/Courses.vue'
import profile from '../pages/Profile.vue'
import notifications from '../pages/Notifications.vue'
import settings from '../pages/Settings.vue'
import help from '../pages/Help.vue'

const routes = [
    {
        name:'Dashboard',
        path:'/',
        component:dashboard
    },
    {
        name:'Courses',
        path:'/courses',
        component:courses
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
        name:'Help',
        path:'/help',
        component:help
    },
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