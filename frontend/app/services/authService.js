export const authService = {
    login: async (username, password) => {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username, password }),
        // });
        // if (!response.ok) throw new Error('Invalid credentials');
        // return await response.json();

        if (username === 'admin' && password === 'admin') {
            return { success: true, message: 'Signed in as admin!' };
        }
        throw new Error('Invalid credentials');
    },

    logout: async () => {
        // TODO: Implement actual API call to invalidate session/token
        // const response = await fetch('/api/logout', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        // });
        // if (!response.ok) throw new Error('Logout failed');
        // return await response.json();

        return Promise.resolve({ success: true });
    }
};
