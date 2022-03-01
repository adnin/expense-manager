<template>
    <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </div> -->
    <!-- <div>
        <span>Welcome to Expense Manager</span>
        <button id="logout" class="bg-blue-500 text-white">Log out</button>
    </div> -->
    <nav class="container flex justify-end py-4 mx-auto bg-white shadow-md">
        <div class="space-x-8">
            <span>Welcome to Expense Manager</span>
            <button data-logout class="px-4 py-2text-green-600 rounded-lg hover:text-green-900">Log out</button>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav'
};
</script>
