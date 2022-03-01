<template>
    <div>
        <Nav />
        <p>Welcome to Your Vue.js App</p>
    </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav';
export default {
    name: 'Home',
    components: {
        Nav
    }
};
</script>
