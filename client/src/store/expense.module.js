import { ExpensesService, JwtService, ApiService } from '../common/api.service';
import { FETCH_EXPENSES, EXPENSE_CREATE, EXPENSE_UPDATE, EXPENSE_DESTROY } from './actions.type';
import { RESET_STATE, SET_EXPENSES, SET_ERROR } from './mutations.type';

const initialState = {
    errors: null,
    expenses: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_EXPENSES](context) {
        const { data } = await ExpensesService.get();
        context.commit(SET_EXPENSES, data.expenses);
        return data;
    },
    async [EXPENSE_CREATE](context, payload) {
        return new Promise((resolve, reject) => {
            ExpensesService.post(payload)
                .then((e) => {
                    context.dispatch(FETCH_EXPENSES);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [EXPENSE_DESTROY](context, id) {
        return new Promise((resolve, reject) => {
            ExpensesService.destroy(id)
                .then((e) => {
                    context.dispatch(FETCH_EXPENSES);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [EXPENSE_UPDATE](context, payload) {
        return new Promise((resolve, reject) => {
            ExpensesService.update(payload)
                .then((e) => {
                    context.dispatch(FETCH_EXPENSES);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    }
};

export const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_EXPENSES](state, expenses) {
        state.expenses = expenses;
    },
    [RESET_STATE]() {
        for (const f in state) {
            state[f] = initialState;
        }
    }
};

const getters = {
    expenses(state) {
        return state.expenses;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
