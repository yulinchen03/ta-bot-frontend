import Login from '@/pages/Login.vue';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';
import { HttpResponse, graphql, http } from 'msw'
import "whatwg-fetch"
import { setupServer } from 'msw/node';

// Setup msw server
const server = setupServer(
    http.post('https://tabot-backend-to7n.onrender.com/login', () => {
        console.log('called')
       return HttpResponse.ok();
    })
);

beforeAll(() => server.listen({onUnhandledRequest: "error"})); // Start the server
afterEach(() => server.resetHandlers()); // Reset any request handlers after each test
afterAll(() => server.close()); // Clean up

describe('Login', () => {
   it('renders correctly', async () => { // Add async here
      const wrapper = shallowMount(Login);
      expect(wrapper.exists()).toBe(true);
   });

   it('should fill in email and password and simulate a login attempt', async () => {
      const wrapper = shallowMount(Login, {
            global: {
                components: {
                'router-link': RouterLinkStub
                }
            }
      });
       console.log('called')

      // Fill in email and password fields
      await wrapper.setData({ loginForm: { email: 'test@example.com', password: 'password' } });

      // Trigger login method
      await wrapper.find('.custom-button').trigger('click');

      // You might want to wait for asynchronous operations to finish before asserting
      await wrapper.vm.$nextTick();

       expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/dashboard');
   });

   it('should display error message if login form is submitted with empty fields', async () => {
      const wrapper = shallowMount(Login);

      // Trigger login method without filling in fields
      await wrapper.find('.custom-button').trigger('click');

      // Wait for asynchronous operations to finish
      await wrapper.vm.$nextTick();

      // Assert that error message is displayed
      expect(wrapper.text()).toContain('Something is not right. Please check your credentials.');
   });

   it('should display error message if login form is submitted with invalid email format', async () => {
      const wrapper = shallowMount(Login);

      // Fill in password but an invalid email format
      await wrapper.setData({ loginForm: { email: 'invalid_email', password: 'password' } });

      // Trigger login method
      await wrapper.find('.custom-button').trigger('click');

      // Wait for asynchronous operations to finish
      await wrapper.vm.$nextTick();

      // Assert that error message is displayed
      expect(wrapper.text()).toContain('Email is invalid.');
   });

});