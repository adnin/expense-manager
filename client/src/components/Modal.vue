<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div
                class="bg-white overflow-x-auto flex flex-col shadow-md rounded-md w-2/6"
                role="dialog"
                aria-labelledby="modalTitle"
                aria-describedby="modalDescription"
            >
                <header class="modal-header" id="modalTitle">
                    <h1>{{ title }}</h1>
                </header>

                <section class="modal-body" id="modalDescription">
                    <form class="w-full">
                        <p class="text-red-600 mb-4" v-if="error">{{ error }}</p>
                        <div class="mb-4" v-for="d in data" :key="d.id">
                            <label class="block text-gray-700 text-sm mb-2" :for="d.name">{{ d.label }}</label>
                            <input
                                v-if="d.type !== 'select'"
                                :type="d.type"
                                :id="d.name"
                                :value="d.value"
                                @input="(event) => (d.value = event.target.value)"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            />

                            <select
                                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                v-if="d.type === 'select'"
                                v-model="d.value"
                                @change="(event) => (d.value = event.target.value)"
                            >
                                <option v-for="dropdown in ddData" :value="dropdown.name" :key="dropdown.id">{{ dropdown.name }}</option>
                            </select>
                            <!-- <p class="text-red-500 text-xs italic">Please choose a password.</p> -->
                        </div>
                    </form>
                </section>

                <footer class="modal-footer">
                    <div v-if="type === 'update'" class="flex items-center justify-between">
                        <button
                            @click="remove"
                            class="text-red-500 mx-3 border-gray-300 font-bold py-1 shadow-md px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Delete
                        </button>
                        <div>
                            <button
                                @click="close"
                                class="text-gray-500 border-gray-300 font-bold py-1 shadow-md px-2 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                @click="update"
                                class="text-green-500 border-gray-300 font-bold py-1 shadow-md px-2 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                    <div v-else class="flex items-center justify-end">
                        <button
                            @click="close"
                            class="text-gray-500 border-gray-300 font-bold py-1 shadow-md px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            @click="add"
                            class="text-green-500 border-gray-300 font-bold py-1 shadow-md px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Save
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'Modal',
    props: {
        title: { type: String, required: true },
        data: { type: Array, required: true },
        ddData: { type: Array, required: false },
        type: { type: String, required: true },
        error: { type: String, required: false }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        update() {
            this.$emit('update', this.data);
        },
        add() {
            this.$emit('add', this.data);
        },
        remove() {
            this.$emit('remove', this.data);
        }
    }
};
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-header,
.modal-footer {
    padding: 15px;
    display: flex;
}

.modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    justify-content: space-between;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
}

.modal-body {
    padding: 20px 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
