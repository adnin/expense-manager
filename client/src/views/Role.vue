<template>
    <div>
        <div class="flex flex-col px-8 py-8 lg:w-2/3 md:w-3/4">
            <div class="flex justify-end my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden">
                        <Table :tHead="tHead" :data="people" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    @click="showModal"
                    class="px-2 py-1 mt-8 shadow-md text-gray-700 rounded-sm hover:bg-green-500 hover:text-white border border-gray-300"
                >
                    Add Role
                </button>
            </div>
        </div>

        <Modal title="Add Role" :data="data" v-show="isModalVisible" @close="closeModal" />
    </div>
</template>

<script>
import Table from '@/components/Table';
import Modal from '@/components/Modal';

const tHead = ['Display Name', 'Description', 'Created at'];
const people = [
    {
        role: 'Admin',
        description: 'Regional Paradigm Technician',
        date: '2022-02-03'
    }
];

const data = [
    { id: 1, name: 'name', label: 'Display Name', type: 'text', value: '' },
    { id: 2, name: 'description', label: 'Description', type: 'text', value: '' }
];
export default {
    name: 'Role',
    setup() {
        return {
            tHead,
            people,
            data
        };
    },
    components: {
        Table,
        Modal
    },
    data() {
        return {
            isModalVisible: false
        };
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        }
    }
};
</script>
