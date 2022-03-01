import { shallowMount } from '@vue/test-utils';
import axios from 'axios';

import Login from '@/views/Login.vue';
import store from '@/store';

describe('Login Page', () => {
    describe('Layout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Login, {
                global: {
                    plugins: [store]
                }
            });
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

    describe('Interaction', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallowMount(Login, {
                global: {
                    plugins: [store]
                }
            });
        });

        it('submit login button', async () => {
            const login = wrapper.find('[data-login]');

            const email = wrapper.find('[data-email]');
            await email.setValue('adninonofre@gmail.com');

            const password = wrapper.find('[data-password]');
            await password.setValue('password');

            const data = {
                email: email.element.value,
                password: password.element.value
            };

            login.trigger('click');

            expect(data).toEqual({
                email: 'adninonofre@gmail.com',
                password: 'password'
            });
        });

        it('displays spinner after clicking the submit and hide after response received', async () => {
            await wrapper.setData({ apiProgress: true });
            expect(wrapper.find('[data-loader]').exists()).toBeTruthy();

            await wrapper.setData({ apiProgress: false });
            expect(wrapper.find('[data-loader]').exists()).toBeFalsy();
        });
    });
});
