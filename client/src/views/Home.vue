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
                        <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700"> Dashboard </a>
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                            User Management
                        </a>
                        <ul class="ml-4 list-outside">
                            <li>
                                <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                                    Role
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                                    Users
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                            Expense Management
                        </a>
                        <ul class="ml-4 list-outside">
                            <li>
                                <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                                    Expense Categories
                                </a>
                            </li>
                            <li>
                                <a href="#" class="block py-1 px-3 rounded transition duration-200 text-white hover:text-gray-700">
                                    Expenses
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!-- Scroll wrapper -->
            <div class="flex-1 flex overflow-hidden">
                <!-- Scrollable container -->
                <div class="flex-1 overflow-x-scroll">
                    <!-- Your content -->
                </div>
            </div>
        </div>
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
