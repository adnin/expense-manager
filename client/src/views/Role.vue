<template>
    <div>
        <div class="flex flex-col px-8 py-8 lg:w-2/3 md:w-3/4">
            <div class="flex justify-end my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden">
                        <Table :tHead="tHead" :data="roles" @selected="selected" />
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
        <Modal :type="modalType" :title="modalTitle" :data="data" v-show="isModalVisible" @close="closeModal" @update="update" />
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { FETCH_ROLES } from '@/store/actions.type';

import Table from '@/components/Table';
import Modal from '@/components/Modal';

const tHead = ['Display Name', 'Description', 'Created at'];
const data = [
    { id: 1, name: 'name', label: 'Display Name', type: 'text', value: '' },
    { id: 2, name: 'description', label: 'Description', type: 'text', value: '' }
];
export default {
    name: 'Role',
    setup() {
        return {
            tHead,
            data,
            modalTitle: 'Add Role',
            modalType: 'add'
        };
    },
    components: {
        Table,
        Modal
    },
    beforeRouteEnter(to, from, next) {
        Promise.all([store.dispatch(FETCH_ROLES)]).then(() => {
            next();
        });
    },
    computed: {
        ...mapGetters(['roles'])
    },
    data() {
        return {
            isModalVisible: false
        };
    },
    methods: {
        showModal() {
            this.modalTitle = 'Add Role';
            this.modalType = 'add';
            this.data[0].value = '';
            this.data[1].value = '';
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        selected(value) {
            this.modalTitle = 'Update Role';
            this.modalType = 'update';
            this.data[0].value = value.name;
            this.data[1].value = value.description;
            this.isModalVisible = true;
        },
        update(value) {
            console.log({ value });
            this.isModalVisible = false;
            let loader = this.$loading.show({
                // Optional parameters
                canCancel: true,
                onCancel: this.onCancel
            });
            // simulate AJAX
            setTimeout(() => {
                loader.hide();
                this.$toast.success(`Hey! I'm here`);
            }, 5000);
        }
    }
};
</script>
