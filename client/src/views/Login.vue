<template>
    <div class="flex items-center justify-center min-h-screen bg-blue-100">
        <div class="lg:w-1/3 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-md">
            <h1 class="text-2xl font-bold text-center text-green-500">Login | Expense Manager</h1>
            <form>
                <div class="mt-4">
                    <div>
                        <label class="block" for="email">Email</label>
                        <input
                            type="email"
                            data-email
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
                            placeholder="Password"
                            class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
                        />
                    </div>
                    <div class="flex items-baseline justify-between">
                        <button data-login class="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900">Login</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'Login'
};
</script>
