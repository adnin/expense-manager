<template>
    <div>
        <div class="flex flex-col px-8 py-8 lg:w-2/3 md:w-3/4">
            <div class="flex justify-end my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden">
                        <Table :tHead="tHead" :data="formatUsers" @selected="selected" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    @click="showModal"
                    class="px-2 py-1 mt-8 shadow-md text-gray-700 rounded-sm hover:bg-green-500 hover:text-white border border-gray-300"
                >
                    Add User
                </button>
            </div>
        </div>
        <Modal
            :type="modalType"
            :title="modalTitle"
            :data="data"
            :ddData="roles"
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
import { FETCH_USERS, FETCH_ROLES, USER_UPDATE, USER_CREATE, USER_DESTROY } from '@/store/actions.type';

import Table from '@/components/Table';
import Modal from '@/components/Modal';

const tHead = ['Name', 'Email Address', 'Role', 'Created at'];
const data = [
    { id: 1, name: 'name', label: 'Display Name', type: 'text', value: '' },
    { id: 2, name: 'email', label: 'Email Address', type: 'text', value: '' },
    { id: 3, name: 'role', label: 'Role', type: 'select', value: 'admin' }
];

export default {
    name: 'Users',
    setup() {
        return {
            tHead,
            data,
            modalTitle: 'Add User',
            modalType: 'add'
        };
    },
    components: {
        Table,
        Modal
    },
    beforeRouteEnter(to, from, next) {
        Promise.all([store.dispatch(FETCH_USERS)], [store.dispatch(FETCH_ROLES)]).then(() => {
            next();
        });
    },
    computed: {
        ...mapGetters(['roles']),
        formatUsers() {
            let users = [];
            const getUsers = this.$store.getters.users;
            for (let i = 0; i < getUsers.length; i++) {
                const e = getUsers[i];
                const user = { id: e.id, name: e.name, email: e.email, role: e.roles[0].name, created_at: e.created_at };
                users.push(user);
            }
            return users;
        }
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
            this.modalTitle = 'Add User';
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
            if (value.role === 'admin') {
                return this.$toast.error('You do not have the required authorization.', { position: 'top-right' });
            }
            this.modalTitle = 'Update User';
            this.modalType = 'update';
            this.data[0].value = value.name;
            this.data[1].value = value.email;
            this.data[2].value = value.role;
            this.selectedId = value.id;
            this.isModalVisible = true;
        },
        add(value) {
            if (!this.data[0].value || !this.data[1].value || !this.data[2].value) {
                return (this.error = 'Please fill out the form completely');
            }
            this.error = null;
            const user = {
                name: value[0].value,
                email: value[1].value,
                role: value[2].value
            };
            this.isModalVisible = false;
            let loader = this.$loading.show();
            this.$store
                .dispatch(USER_CREATE, user)
                .then(() => {
                    loader.hide();
                    this.$toast.success(`User has been Added`, { position: 'top-right' });
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.error(error, { position: 'top-right' });
                });
        },
        update(value) {
            if (this.selectedId) {
                const user = {
                    id: this.selectedId,
                    name: value[0].value,
                    email: value[1].value,
                    role: value[2].value
                };
                this.isModalVisible = false;
                let loader = this.$loading.show();
                this.$store
                    .dispatch(USER_UPDATE, user)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`User has been Updated`, { position: 'top-right' });
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
                    .dispatch(USER_DESTROY, this.selectedId)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`User has been Deleted`, { position: 'top-right' });
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
