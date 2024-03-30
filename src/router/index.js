import {createRouter, createWebHistory} from "vue-router";
import teachercourses from "@/pages/TeacherCourses.vue";
import studentcourses from "@/pages/StudentCourses.vue";
import profile from '../pages/Profile.vue'
import messages from '../pages/Messages.vue'
import settings from '../pages/Settings.vue'
import helpCenter from '../pages/HelpCenter.vue'
import help from '../pages/Help.vue'
import login from '../pages/Login.vue'
import teachercourse from '../pages/TeacherCourse.vue'
import studentcourse from '../pages/StudentCourse.vue'

const routes = [
    {
        name:'Login',
        path:'/',
        alias: '/login',
        component:login
    },
    {
        name:'TeacherCourses',
        path:'/teachercourses',
        component: teachercourses
    },
    {
        name:'StudentCourses',
        path:'/studentcourses',
        component: studentcourses
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
        name:'teachercourse',
        path:'/teachercourse',
        component: teachercourse

    },
    {
        name:'studentcourse',
        path:'/studentcourse',
        component: studentcourse
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