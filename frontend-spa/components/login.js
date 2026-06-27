const LoginComponent = {
    template: `
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Login Admin</h2>
            <div v-if="error" class="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">{{ error }}</div>
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input v-model="username" type="text" placeholder="Username"
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input v-model="password" type="password" placeholder="Password"
                    class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button @click="login" :disabled="loading"
                class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
                {{ loading ? 'Loading...' : 'Login' }}
            </button>
        </div>
    </div>
    `,
    data() {
        return { username: '', password: '', error: '', loading: false }
    },
    methods: {
        async login() {
            this.loading = true;
            this.error = '';
            try {
                const res = await axios.post(`${API_URL}/login`, {
                    username: this.username,
                    password: this.password
                });
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('isLoggedIn', true);
                this.$router.push('/dashboard');
            } catch (e) {
                this.error = 'Username atau password salah!';
            } finally {
                this.loading = false;
            }
        }
    }
};