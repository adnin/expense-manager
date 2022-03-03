<template>
    <nav v-if="isAuthenticated" class="container flex justify-end py-4 mx-auto bg-white shadow-md">
        <div class="space-x-8">
            <span>Welcome to Expense Manager</span>
            <button @click="logout" data-logout class="px-4 py-2text-green-600 rounded-lg hover:text-green-900">Log out</button>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/store/actions.type';

export default {
    name: 'Nav',
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT).then(() => {
                this.$router.push({ path: '/login' });
            });
        }
    }
};
</script>
