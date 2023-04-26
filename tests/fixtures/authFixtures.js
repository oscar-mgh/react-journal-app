export const initialState = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated',
	uid: '123ABC',
	email: 'demo@googlcom',
	displayName: 'Demo User',
	photoURL: 'https://demophoto.jpg',
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'not-authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const demoUser = {
	uid: 'ABC123',
	email: 'demo@googlcom',
	displayName: 'Demo User',
	photoURL: 'https://demophoto.jpg',
};
