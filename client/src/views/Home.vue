<template>
    <div>
        <Nav />
        <div class="h-screen flex">
            <!-- Fixed sidebar -->
            <div class="bg-green-600 w-48">
                <!-- Sidebar content -->
                <div class="w-10 h-10 rounded-full bg-gray-400 m-3"></div>
                <span class="py-2 px-3 text-white">Adnin Onofre (admin)</span>
                <ul class="list-outside mt-5">
                    <li>
                        <router-link
                            class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"
                            to="home/dashboard"
                            >Dashboard</router-link
                        >
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                            User Management
                        </a>
                        <ul class="ml-4 list-outside">
                            <li>
                                <router-link
                                    class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"
                                    to="home/role"
                                    >Role</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"
                                    to="home/users"
                                    >Users</router-link
                                >
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                            Expense Management
                        </a>
                        <ul class="ml-4 list-outside">
                            <li>
                                <router-link
                                    class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"
                                    to="home/categories"
                                    >Expense Categories</router-link
                                >
                            </li>
                            <li>
                                <router-link
                                    class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"
                                    to="home/expenses"
                                    >Expense</router-link
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- Scroll wrapper -->
            <div class="flex-1 flex overflow-hidden">
                <!-- Scrollable container -->
                <div class="flex-1 overflow-x-scroll">
                    <TitleBar :path="path" :name="name" />
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { CHECK_AUTH, LOGOUT } from '@/store/actions.type';

import Nav from '@/components/Nav';
import TitleBar from '@/components/TitleBar';

export default {
    name: 'Home',
    components: {
        Nav,
        TitleBar
    },
    beforeCreate() {
        this.$store
            .dispatch(CHECK_AUTH)
            .then()
            .catch(() => {
                this.$store.dispatch(LOGOUT);
                this.$router.push({ name: 'Login' });
            });
    },
    computed: {
        name() {
            return this.$route.name;
        },
        path() {
            return this.$route.path;
        }
    }
};
</script>
