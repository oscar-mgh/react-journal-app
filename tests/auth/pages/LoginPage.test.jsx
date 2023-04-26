import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
	startGoogleSignIn: () => mockStartGoogleSignIn,
	startLoginWithEmailPassword: ({ email, password }) => {
		return () => mockStartLoginWithEmailPassword({ email, password });
	},
}));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => fn => fn(),
}));

console.log(mockStartGoogleSignIn);

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe('Pruebas en <LoginPage />', () => {
	beforeEach(() => jest.clearAllMocks());

	test('Debe de mostrar el componente correctamente', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
	});

	test('Boton de Google debe de llamar el startGoogleSignIn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		// console.log(store.getState());
		const googleBtn = screen.getByLabelText('google-btn');
		fireEvent.click(googleBtn);
		// console.log(store.getState());
		expect(mockStartGoogleSignIn).toHaveBeenCalled();
	});

	test('submit debe de llamar startLoginWithEmailPassword', () => {
		const email = 'oscar@google.com';
		const password = '123456';
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);
		const emailField = screen.getByRole('textbox', { name: 'Correo' });
		fireEvent.change(emailField, { target: { name: 'email', value: email } });
		const passwordField = screen.getByLabelText('password');
		fireEvent.change(passwordField, {
			target: { name: 'password', value: password },
		});
		const loginForm = screen.getByTestId('form');
		fireEvent.submit(loginForm);
		expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
			email: email,
			password: password,
		});
	});
});
