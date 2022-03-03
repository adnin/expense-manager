import { DashboardService } from '../common/api.service';
import { FETCH_DASHBOARD } from './actions.type';
import { RESET_STATE, SET_DASHBOARD, SET_ERROR } from './mutations.type';

const initialState = {
    errors: null,
    expenses: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_DASHBOARD](context) {
        const { data } = await DashboardService.get();
        context.commit(SET_DASHBOARD, data.categories);
        return data;
    }
};

export const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_DASHBOARD](state, categories) {
        state.expenses = categories;
    },
    [RESET_STATE]() {
        for (const f in state) {
            state[f] = initialState;
        }
    }
};

const getters = {
    dashboardExpenses(state) {
        return state.expenses;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
