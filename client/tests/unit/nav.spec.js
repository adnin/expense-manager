import { shallowMount } from '@vue/test-utils';
import { mapGetters, createStore } from 'vuex';

import Nav from '@/components/Nav.vue';

describe('Nav Page', () => {
    let wrapper;
    const getters = {
        isAuthenticated: () => 'isAuthenticated'
    };

    const store = createStore({
        state() {
            return {
                isAuthenticated: true
            };
        },
        getters
    });

    beforeEach(() => {
        wrapper = shallowMount(Nav, {
            global: {
                plugins: [store]
            }
        });
    });

    it('should include a welcome message if login.', () => {
        const msg = 'Welcome to Expense Manager';
        expect(wrapper.text()).toMatch(msg);
    });
    it('should include a logout button if login', () => {
        expect(wrapper.find('[data-logout]').exists()).toBe(true);
    });
});
