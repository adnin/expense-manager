import { shallowMount } from '@vue/test-utils';
import Login from '@/views/Login.vue';

describe('Login Page', () => {
    describe('Layout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Login);
        });

        it('has header', () => {
            const msg = 'Login';
            expect(wrapper.find('h1').text()).toMatch(msg);
        });
    });

    describe('Interaction', () => {});
});
