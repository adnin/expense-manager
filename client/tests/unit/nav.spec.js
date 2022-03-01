import { shallowMount } from '@vue/test-utils';
import Nav from '@/components/Nav.vue';

describe('Nav Page', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Nav);
    });

    it('should include a welcome message.', () => {
        const msg = 'Welcome to Expense Manager';
        expect(wrapper.text()).toMatch(msg);
    });
    it('should include a logout button', () => {
        expect(wrapper.find('#logout').exists()).toBe(true);
    });
});
