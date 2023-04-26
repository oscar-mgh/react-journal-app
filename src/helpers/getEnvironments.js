export const getEnvironments = () => {
	const environmentVariables = import.meta.env;

	return {
		...environmentVariables,
	};
};
