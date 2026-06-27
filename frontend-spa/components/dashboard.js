const DashboardComponent = {
    template: `
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold text-blue-700">E-Inventory</h1>
            <div class="flex gap-4 items-center">
                <router-link to="/dashboard" class="text-gray-600 hover:text-blue-600">Dashboard</router-link>
                <router-link to="/kategori" class="text-gray-600 hover:text-blue-600">Kategori</router-link>
                <router-link to="/barang" class="text-gray-600 hover:text-blue-600">Barang</router-link>
                <button @click="logout" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout</button>
            </div>
        </nav>
        <div class="p-8">
            <h2 class="text-2xl font-bold text-gray-700 mb-6">Dashboard Admin</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
                    <div class="text-3xl font-bold text-blue-600">{{ totalBarang }}</div>
                    <div class="text-gray-500 mt-1">Total Barang</div>
                </div>
                <div class="bg-white rounded-xl shadow p-6 border-l-4 border-green-500">
                    <div class="text-3xl font-bold text-green-600">{{ totalKategori }}</div>
                    <div class="text-gray-500 mt-1">Total Kategori</div>
                </div>
                <div class="bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500">
                    <div class="text-3xl font-bold text-yellow-600">{{ totalStok }}</div>
                    <div class="text-gray-500 mt-1">Total Stok</div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return { totalBarang: 0, totalKategori: 0, totalStok: 0 }
    },
    async mounted() {
        const [barang, kategori] = await Promise.all([
            axios.get(`${API_URL}/barang`),
            axios.get(`${API_URL}/kategori`)
        ]);
        this.totalBarang = barang.data.data?.length || 0;
        this.totalKategori = kategori.data.data?.length || 0;
        this.totalStok = barang.data.data?.reduce((a, b) => a + parseInt(b.stok), 0) || 0;
    },
    methods: {
        async logout() {
            await axios.post(`${API_URL}/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            this.$router.push('/login');
        }
    }
};