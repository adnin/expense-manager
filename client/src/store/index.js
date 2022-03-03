import { createStore } from 'vuex';
import auth from './auth.module';
import role from './role.module';
import user from './user.module';
import category from './category.module';
import expense from './expense.module';
import dashboard from './dashboard.module';

export default createStore({
    modules: {
        auth,
        role,
        user,
        category,
        expense,
        dashboard
    }
});
