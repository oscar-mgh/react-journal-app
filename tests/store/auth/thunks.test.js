import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	singInWithGoogle,
} from '../../../src/firebase/providers';
import {checkingCredentials, login, logout} from '../../../src/store/auth';
import {
	checkingAuthentication,
	startCreatingUserWithEmailPassword,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from '../../../src/store/auth/thunks';
import {clearNotesLogout} from '../../../src/store/journal';
import {demoUser} from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
	const dispatch = jest.fn();
	beforeEach(() => jest.clearAllMocks());
	test('debe de invocar el checkingCredentials', async () => {
		await checkingAuthentication()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	test('startGoogleSignIn debe de llamar checkingCredentials y login', async () => {
		const loginData = {ok: true, ...demoUser};
		await singInWithGoogle.mockResolvedValue(loginData);
		await startGoogleSignIn()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startGoogleSignIn debe de llamar checkingCredentials y logout con el mensaje de error', async () => {
		const loginData = {ok: false, errorMessage: 'Error en Google'};
		await singInWithGoogle.mockResolvedValue(loginData);
		await startGoogleSignIn()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
	});

  test('startCreatingUserWithEmailPassword debe de llamar checkingCredencials y login', async() => {
    const loginData = {ok: true, ...demoUser};
		const formData = {email: demoUser.email, password: '123456', displayName: 'demoUser'};
		await registerUserWithEmailPassword.mockResolvedValue(loginData);
		await startCreatingUserWithEmailPassword(formData)(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

	test('startLoginWithEmailPassword debe de llamar checkingCredencials y login', async () => {
		const loginData = {ok: true, ...demoUser};
		const formData = {email: demoUser.email, password: '123456'};
		await loginWithEmailPassword.mockResolvedValue(loginData);
		await startLoginWithEmailPassword(formData)(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('startLogout debe de llamar logoutFirebase, clearNotes y Logout', async () => {
		await startLogout()(dispatch);
		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout());
	});
});
