import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

import store from '../store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: 'dashboard' // default child path
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue')
            },
            {
                path: 'roles',
                name: 'User Management > Roles',
                component: () => import('../views/Roles.vue'),
                meta: { admin: true }
            },
            {
                path: 'users',
                name: 'User Management > Users',
                component: () => import('../views/Users.vue'),
                meta: { admin: true }
            },
            {
                path: 'categories',
                name: 'Expense Management > Expense Categories',
                component: () => import('../views/Categories.vue'),
                meta: { admin: true }
            },
            {
                path: 'expenses',
                name: 'Expense Management > Expenses',
                component: () => import('../views/Expenses.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: { guest: true }
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'border-white border-b'
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next('/login');
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.admin)) {
        if (store.getters.userRoles.some((e) => e.name === 'admin') && store.getters.isAuthenticated) {
            next();
            return;
        }
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
