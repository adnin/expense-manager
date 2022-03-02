import { RolesService, JwtService, ApiService } from '../common/api.service';
import { FETCH_ROLES, ROLE_CREATE, ROLE_UPDATE, ROLE_DESTROY } from './actions.type';
import { RESET_STATE, SET_ROLES } from './mutations.type';

const initialState = {
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
        await RolesService.post(payload, payload);
        context.dispatch(FETCH_ROLES);
    },
    async [ROLE_DESTROY](context, payload) {
        await RolesService.destroy(payload, payload);
        context.dispatch(FETCH_ROLES);
    },
    async [ROLE_UPDATE]({ state }) {
        await RolesService.put(payload, payload);
        context.dispatch(FETCH_ROLES);
    }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
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
