/*
 SageFellow AI - Authentication Module
 Handles Sign In, Sign Up, Guest Mode, and sessions.
 Replace storage logic with real backend auth later.
*/

const SageAuth = {
    storageKey: 'sagefellow_user',

    signup(username, password) {
        if (!username || !password) throw new Error('Username and password required');

        const users = JSON.parse(localStorage.getItem('sagefellow_users') || '{}');
        if (users[username]) throw new Error('Account already exists');

        users[username] = { username, password };
        localStorage.setItem('sagefellow_users', JSON.stringify(users));

        return this.login(username, password);
    },

    login(username, password) {
        const users = JSON.parse(localStorage.getItem('sagefellow_users') || '{}');
        const user = users[username];

        if (!user || user.password !== password) {
            throw new Error('Invalid login');
        }

        const session = { username, mode: 'user', loggedIn: true };
        localStorage.setItem(this.storageKey, JSON.stringify(session));
        return session;
    },

    guestLogin() {
        const session = {
            username: 'Guest',
            mode: 'guest',
            loggedIn: true
        };

        localStorage.setItem(this.storageKey, JSON.stringify(session));
        return session;
    },

    logout() {
        localStorage.removeItem(this.storageKey);
    },

    currentUser() {
        return JSON.parse(localStorage.getItem(this.storageKey) || 'null');
    }
};

window.SageAuth = SageAuth;
