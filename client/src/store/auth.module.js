import ApiService from '../common/api.service';
import JwtService from '../common/jwt.service';
import RolesService from '../common/roles.service';
import { LOGIN, LOGOUT, CHECK_AUTH } from './actions.type';
import { SET_AUTH, PURGE_AUTH, SET_ERROR } from './mutations.type';

const state = {
    errors: null,
    user: {},
    roles: RolesService.getRoles(),
    isAuthenticated: !!JwtService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    userRoles(state) {
        return JSON.parse(state.roles);
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post('/login', credentials)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    if (!response) {
                        return context.commit(SET_ERROR, null);
                    }
                    if (!response.data.errors) {
                        context.commit(SET_ERROR, [response.data.message]);
                        return reject(response);
                    }
                    context.commit(SET_ERROR, response.data.errors);
                    return reject(response);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [CHECK_AUTH](context) {
        if (JwtService.getToken()) {
            return ApiService.get('user')
                .then(({ data }) => {
                    context.commit(SET_AUTH, data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        if (user.roles) {
            RolesService.saveRoles(user.roles);
        }
        if (state.user.token) {
            JwtService.saveToken(state.user.token);
        }
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        state.roles = {};
        JwtService.destroyToken();
        RolesService.destroyRoles();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
