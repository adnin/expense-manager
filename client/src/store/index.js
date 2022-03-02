import { createStore } from 'vuex';
import auth from './auth.module';
import role from './role.module';

export default createStore({
    modules: {
        auth,
        role
    }
});
