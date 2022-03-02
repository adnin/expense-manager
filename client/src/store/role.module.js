import { RolesService, JwtService, ApiService } from '../common/api.service';
import { FETCH_ROLES, ROLE_CREATE, ROLE_UPDATE, ROLE_DESTROY } from './actions.type';
import { RESET_STATE, SET_ROLES, SET_ERROR } from './mutations.type';

const initialState = {
    errors: null,
    roles: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_ROLES](context) {
        const { data } = await RolesService.get();
        context.commit(SET_ROLES, data.roles);
        return data;
    },
    async [ROLE_CREATE](context, payload) {
        return new Promise((resolve, reject) => {
            RolesService.post(payload)
                .then((e) => {
                    context.dispatch(FETCH_ROLES);
                    resolve(e);
                })
                .catch((e) => {
                    // if (!response.data.errors) {
                    //     context.commit(SET_ERROR, [response.data.message]);
                    //     return reject(response);
                    // }
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [ROLE_DESTROY](context, id) {
        return new Promise((resolve, reject) => {
            RolesService.destroy(id)
                .then((e) => {
                    context.dispatch(FETCH_ROLES);
                    resolve(e);
                })
                .catch((e) => {
                    // if (!response.data.errors) {
                    //     context.commit(SET_ERROR, [response.data.message]);
                    //     return reject(response);
                    // }
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    },
    async [ROLE_UPDATE](context, payload) {
        return new Promise((resolve, reject) => {
            RolesService.update(payload)
                .then((e) => {
                    context.dispatch(FETCH_ROLES);
                    resolve(e);
                })
                .catch((e) => {
                    // if (!response.data.errors) {
                    //     context.commit(SET_ERROR, [response.data.message]);
                    //     return reject(response);
                    // }
                    return reject(e.response.data.message);
                    context.commit(SET_ERROR, e.response.data.message);
                });
        });
    }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_ROLES](state, roles) {
        state.roles = roles;
    },
    [RESET_STATE]() {
        for (const f in state) {
            state[f] = initialState;
        }
    }
};

const getters = {
    roles(state) {
        return state.roles;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
