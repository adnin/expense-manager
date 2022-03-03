import { createStore } from 'vuex';
import auth from './auth.module';
import role from './role.module';
import user from './user.module';

export default createStore({
    modules: {
        auth,
        role,
        user
    }
});
