/*
 SageFellow AI - Backend Service Layer
 Central place for API communication and user data operations.
 Connect real backend endpoints here later.
*/

const SageBackend = {
    apiBase: '',

    async request(endpoint, options = {}) {
        if (!this.apiBase) {
            return {
                success: false,
                message: 'Backend API not configured'
            };
        }

        const response = await fetch(`${this.apiBase}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            ...options
        });

        return response.json();
    },

    async sendChat(message) {
        return this.request('/chat', {
            method: 'POST',
            body: JSON.stringify({ message })
        });
    },

    async getUserProfile() {
        return this.request('/user/profile');
    },

    async saveConversation(data) {
        return this.request('/conversation/save', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

window.SageBackend = SageBackend;
