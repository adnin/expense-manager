<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
        <div class="lg:w-1/3 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <h1 class="text-2xl font-bold text-center text-green-500">Login | Expense Manager</h1>
            <form data-loginForm @submit.prevent="onSubmit(email, password)">
                <div class="mt-4">
                    <ul v-if="errors" class="text-red-600">
                        <p v-for="(v, k) in errors" :key="k">{{ v }}</p>
                    </ul>
                    <div>
                        <label class="block" for="email">Email</label>
                        <input
                            type="email"
                            data-email
                            v-model="email"
                            id="email"
                            placeholder="Email"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                    <div class="mt-4">
                        <label class="block">Password</label>
                        <input
                            type="password"
                            data-password
                            v-model="password"
                            placeholder="Password"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>

                    <div class="flex items-baseline justify-between">
                        <div v-if="apiProgress" data-loader class="loader bg-green-600 px-2 py-3 mt-4 rounded-lg flex space-x-1">
                            <div class="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                            <div class="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                            <div class="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                        </div>
                        <button v-else data-login class="px-4 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { LOGIN } from '@/store/actions.type';
export default {
    name: 'Login',
    data() {
        return {
            apiProgress: false,
            email: null,
            password: null
        };
    },
    methods: {
        onSubmit(email, password) {
            this.apiProgress = true;
            this.$store
                .dispatch(LOGIN, { email, password })
                .then(() => this.$router.push({ name: 'home' }))
                .catch(() => {
                    this.apiProgress = false;
                });
        }
    },
    computed: {
        ...mapState({
            errors: (state) => state.auth.errors
        })
    }
};
</script>
