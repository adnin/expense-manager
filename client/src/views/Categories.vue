<template>
    <div>
        <div class="flex flex-col px-8 py-8 lg:w-2/3 md:w-3/4">
            <div class="flex justify-end my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden">
                        <Table :tHead="tHead" :data="categories" @selected="selected" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    @click="showModal"
                    class="px-2 py-1 mt-8 shadow-md text-gray-700 rounded-sm hover:bg-green-500 hover:text-white border border-gray-300"
                >
                    Add Category
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
import { FETCH_CATEGORIES, CATEGORY_UPDATE, CATEGORY_CREATE, CATEGORY_DESTROY } from '@/store/actions.type';

import Table from '@/components/Table';
import Modal from '@/components/Modal';

const tHead = ['Display Name', 'Description', 'Created at'];
const data = [
    { id: 1, name: 'name', label: 'Display Name', type: 'text', value: '' },
    { id: 2, name: 'description', label: 'Description', type: 'text', value: '' }
];
export default {
    name: 'Categories',
    setup() {
        return {
            tHead,
            data,
            modalTitle: 'Add Category',
            modalType: 'add'
        };
    },
    components: {
        Table,
        Modal
    },
    beforeRouteEnter(to, from, next) {
        Promise.all([store.dispatch(FETCH_CATEGORIES)]).then(() => {
            next();
        });
    },
    computed: {
        ...mapGetters(['categories'])
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
            this.modalTitle = 'Add Category';
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
            this.modalTitle = 'Update Category';
            this.modalType = 'update';
            this.data[0].value = value.name;
            this.data[1].value = value.description;
            this.selectedId = value.id;
            this.isModalVisible = true;
        },
        add(value) {
            if (!this.data[0].value || !this.data[1].value) {
                return (this.error = 'Please fill out the form completely');
            }
            this.error = null;
            const category = {
                name: value[0].value,
                description: value[1].value
            };
            this.isModalVisible = false;
            let loader = this.$loading.show();
            this.$store
                .dispatch(CATEGORY_CREATE, category)
                .then(() => {
                    loader.hide();
                    this.$toast.success(`Category has been Added`, { position: 'top-right' });
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.error(error, { position: 'top-right' });
                });
        },
        update(value) {
            if (this.selectedId) {
                const category = {
                    id: this.selectedId,
                    name: value[0].value,
                    description: value[1].value
                };
                this.isModalVisible = false;
                let loader = this.$loading.show();
                this.$store
                    .dispatch(CATEGORY_UPDATE, category)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Category has been Updated`, { position: 'top-right' });
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
                    .dispatch(CATEGORY_DESTROY, this.selectedId)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Category has been Deleted`, { position: 'top-right' });
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
