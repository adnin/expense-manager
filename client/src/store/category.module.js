import { CategoriesService } from '../common/api.service';
import { FETCH_CATEGORIES, CATEGORY_CREATE, CATEGORY_UPDATE, CATEGORY_DESTROY } from './actions.type';
import { RESET_STATE, SET_CATEGORIES, SET_ERROR } from './mutations.type';

const initialState = {
    errors: null,
    categories: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_CATEGORIES](context) {
        const { data } = await CategoriesService.get();
        context.commit(SET_CATEGORIES, data.categories);
        return data;
    },
    async [CATEGORY_CREATE](context, payload) {
        return new Promise((resolve, reject) => {
            CategoriesService.post(payload)
                .then((e) => {
                    context.dispatch(FETCH_CATEGORIES);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [CATEGORY_DESTROY](context, id) {
        return new Promise((resolve, reject) => {
            CategoriesService.destroy(id)
                .then((e) => {
                    context.dispatch(FETCH_CATEGORIES);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [CATEGORY_UPDATE](context, payload) {
        return new Promise((resolve, reject) => {
            CategoriesService.update(payload)
                .then((e) => {
                    context.dispatch(FETCH_CATEGORIES);
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
    [SET_CATEGORIES](state, categories) {
        state.categories = categories;
    },
    [RESET_STATE]() {
        for (const f in state) {
            state[f] = initialState;
        }
    }
};

const getters = {
    categories(state) {
        return state.categories;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
