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
                component: () => import('../views/Dashboard.vue')
            },
            {
                path: 'role',
                component: () => import('../views/Role.vue')
            },
            {
                path: 'users',
                component: () => import('../views/Users.vue')
            },
            {
                path: 'categories',
                component: () => import('../views/Categories.vue')
            },
            {
                path: 'expenses',
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
    routes
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

export default router;
