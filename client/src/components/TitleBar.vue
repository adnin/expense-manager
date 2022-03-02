<template>
    <nav class="container flex justify-between px-8 py-8 mx-auto">
        <h2 class="text-xl">{{ title }}</h2>
        <span class="text-gray-700">{{ name }}</span>
    </nav>
</template>

<script>
export default {
    name: 'TitleBar',
    props: {
        path: { type: String, required: true },
        name: { type: String, required: true }
    },
    methods: {
        capitalizeFirstLetter: (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    },
    computed: {
        // computed property that auto-updates when the prop changes
        title() {
            return this.capitalizeFirstLetter(this.path.replace(/\//g, ''));
        }
    }
};
</script>
