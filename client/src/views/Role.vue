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
        <Modal
            :type="modalType"
            :title="modalTitle"
            :data="data"
            :error="error"
            v-show="isModalVisible"
            @close="closeModal"
            @add="add"
            @update="update"
            @remove="remove"
        />
    </div>
</template>

<script>
import store from '@/store';
import { mapGetters } from 'vuex';
import { FETCH_ROLES, ROLE_UPDATE, ROLE_CREATE, ROLE_DESTROY } from '@/store/actions.type';

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
            isModalVisible: false,
            selectedId: 0,
            error: null
        };
    },
    methods: {
        showModal() {
            this.modalTitle = 'Add Role';
            this.modalType = 'add';
            this.data[0].value = '';
            this.data[1].value = '';
            this.selectedId = 0;
            this.isModalVisible = true;
        },
        closeModal() {
            this.error = null;
            this.isModalVisible = false;
        },
        selected(value) {
            this.modalTitle = 'Update Role';
            this.modalType = 'update';
            this.data[0].value = value.name;
            this.data[1].value = value.description;
            this.selectedId = value.id;
            this.isModalVisible = true;
        },
        add(value) {
            console.log(value);
            if (!this.data[0].value || !this.data[1].value) {
                return (this.error = 'Please fill out the form completely');
            }
            this.error = null;
            const role = {
                name: value[0].value,
                guard_name: 'web',
                description: value[1].value
            };
            this.isModalVisible = false;
            let loader = this.$loading.show();
            this.$store
                .dispatch(ROLE_CREATE, role)
                .then(() => {
                    loader.hide();
                    this.$toast.success(`Role has been Added`, { position: 'top-right' });
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.error(error, { position: 'top-right' });
                });
        },
        update(value) {
            if (this.selectedId) {
                const role = {
                    id: this.selectedId,
                    name: value[0].value,
                    description: value[1].value
                };
                this.isModalVisible = false;
                let loader = this.$loading.show();
                this.$store
                    .dispatch(ROLE_UPDATE, role)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Role has been Updated`, { position: 'top-right' });
                    })
                    .catch((error) => {
                        loader.hide();
                        this.$toast.error(error, { position: 'top-right' });
                    });
            }
        },
        remove() {
            if (this.selectedId) {
                this.isModalVisible = false;
                let loader = this.$loading.show();
                this.$store
                    .dispatch(ROLE_DESTROY, this.selectedId)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Role has been Deleted`, { position: 'top-right' });
                    })
                    .catch((error) => {
                        loader.hide();
                        this.$toast.error(error, { position: 'top-right' });
                    });
            }
        }
    }
};
</script>
