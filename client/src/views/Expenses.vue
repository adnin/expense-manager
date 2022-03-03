<template>
    <div>
        <div class="flex flex-col px-8 py-8 lg:w-2/3 md:w-3/4">
            <div class="flex justify-end my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden">
                        <Table :tHead="tHead" :data="formatExpenses" @selected="selected" />
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <button
                    @click="showModal"
                    class="px-2 py-1 mt-8 shadow-md text-gray-700 rounded-sm hover:bg-green-500 hover:text-white border border-gray-300"
                >
                    Add Expense
                </button>
            </div>
        </div>
        <Modal
            :type="modalType"
            :title="modalTitle"
            :data="data"
            :ddData="categories"
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
import { FETCH_EXPENSES, FETCH_CATEGORIES, EXPENSE_UPDATE, EXPENSE_CREATE, EXPENSE_DESTROY } from '@/store/actions.type';

import Table from '@/components/Table';
import Modal from '@/components/Modal';

const tHead = ['Expense Category', 'Amount', 'Entry Date', 'Created at'];
const data = [
    { id: 1, name: 'category', label: 'Expense Category', type: 'select', value: '' },
    { id: 2, name: 'amount', label: 'Amount', type: 'number', value: '' },
    { id: 3, name: 'entry_date', label: 'Entry Date', type: 'date', value: '' }
];

export default {
    name: 'Expenses',
    setup() {
        return {
            tHead,
            data,
            modalTitle: 'Add Expense',
            modalType: 'add'
        };
    },
    components: {
        Table,
        Modal
    },
    beforeRouteEnter(to, from, next) {
        Promise.all([store.dispatch(FETCH_EXPENSES)], [store.dispatch(FETCH_CATEGORIES)]).then(() => {
            next();
        });
    },
    computed: {
        ...mapGetters(['categories']),
        formatExpenses() {
            let expenses = [];
            const getExpenses = this.$store.getters.expenses;
            for (let i = 0; i < getExpenses.length; i++) {
                const e = getExpenses[i];
                const expense = {
                    id: e.id,
                    category: e.category.name,
                    amount: e.amount,
                    entry_date: e.entry_date,
                    created_at: e.created_at
                };
                expenses.push(expense);
            }
            return expenses;
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
            this.modalTitle = 'Add Expense';
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
            this.modalTitle = 'Update Expense';
            this.modalType = 'update';
            this.data[0].value = value.category;
            this.data[1].value = value.amount;
            this.data[2].value = value.entry_date;
            this.selectedId = value.id;
            this.isModalVisible = true;
        },
        add(value) {
            if (!this.data[0].value || !this.data[1].value || !this.data[2].value) {
                return (this.error = 'Please fill out the form completely');
            }
            this.error = null;
            const findCategory = this.categories.find((c) => c.name === value[0].value);
            const expense = {
                category_id: findCategory.id,
                amount: value[1].value,
                entry_date: value[2].value
            };
            this.isModalVisible = false;
            let loader = this.$loading.show();
            this.$store
                .dispatch(EXPENSE_CREATE, expense)
                .then(() => {
                    loader.hide();
                    this.$toast.success(`Expense has been Added`, { position: 'top-right' });
                })
                .catch((error) => {
                    loader.hide();
                    this.$toast.error(error, { position: 'top-right' });
                });
        },
        update(value) {
            if (this.selectedId) {
                const findCategory = this.categories.find((c) => c.name === value[0].value);
                const expense = {
                    id: this.selectedId,
                    category_id: findCategory.id,
                    amount: value[1].value,
                    entry_date: value[2].value
                };
                this.isModalVisible = false;
                let loader = this.$loading.show();
                this.$store
                    .dispatch(EXPENSE_UPDATE, expense)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Expense has been Updated`, { position: 'top-right' });
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
                    .dispatch(EXPENSE_DESTROY, this.selectedId)
                    .then(() => {
                        loader.hide();
                        this.$toast.success(`Expense has been Deleted`, { position: 'top-right' });
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
