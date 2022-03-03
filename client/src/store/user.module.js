import { UsersService, JwtService, ApiService } from '../common/api.service';
import { FETCH_USERS, USER_CREATE, USER_UPDATE, USER_DESTROY } from './actions.type';
import { RESET_STATE, SET_USERS, SET_ERROR } from './mutations.type';

const initialState = {
    errors: null,
    users: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_USERS](context) {
        const { data } = await UsersService.get();
        context.commit(SET_USERS, data.users);
        return data;
    },
    async [USER_CREATE](context, payload) {
        return new Promise((resolve, reject) => {
            UsersService.post(payload)
                .then((e) => {
                    context.dispatch(FETCH_USERS);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [USER_DESTROY](context, id) {
        return new Promise((resolve, reject) => {
            UsersService.destroy(id)
                .then((e) => {
                    context.dispatch(FETCH_USERS);
                    resolve(e);
                })
                .catch((e) => {
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [USER_UPDATE](context, payload) {
        return new Promise((resolve, reject) => {
            UsersService.update(payload)
                .then((e) => {
                    context.dispatch(FETCH_USERS);
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
    [SET_USERS](state, users) {
        state.users = users;
    },
    [RESET_STATE]() {
        for (const f in state) {
            state[f] = initialState;
        }
    }
};

const getters = {
    users(state) {
        return state.users;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
