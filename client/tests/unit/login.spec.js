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

        it('has email input', () => {
            const email = wrapper.find('[data-email]');
            expect(email.exists()).toBe(true);
            expect(email.element.type).toEqual('email');
        });

        it('has password input', () => {
            const password = wrapper.find('[data-password]');
            expect(password.exists()).toBe(true);
            expect(password.element.type).toEqual('password');
        });

        it('has login button', () => {
            expect(wrapper.find('[data-login]').exists()).toBe(true);
        });
    });

    describe('Interaction', () => {});
});
