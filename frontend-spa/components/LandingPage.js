const LandingPageComponent = {
    template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
        <nav class="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 class="text-xl font-bold text-blue-700">E-Inventory</h1>
            <router-link to="/login" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login Admin
            </router-link>
        </nav>
        <div class="flex flex-col items-center justify-center py-20 text-white text-center px-4">
            <h2 class="text-4xl font-bold mb-4">Sistem Manajemen Inventaris</h2>
            <p class="text-lg mb-8 text-blue-100">Kelola barang dan kategori dengan mudah dan efisien</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
                <div class="bg-white text-blue-700 rounded-xl p-6 shadow">
                    <div class="text-4xl font-bold">{{ totalBarang }}</div>
                    <div class="text-gray-500 mt-1">Total Barang</div>
                </div>
                <div class="bg-white text-blue-700 rounded-xl p-6 shadow">
                    <div class="text-4xl font-bold">{{ totalKategori }}</div>
                    <div class="text-gray-500 mt-1">Total Kategori</div>
                </div>
                <div class="bg-white text-blue-700 rounded-xl p-6 shadow">
                    <div class="text-4xl font-bold">{{ totalStok }}</div>
                    <div class="text-gray-500 mt-1">Total Stok</div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            totalBarang: 0,
            totalKategori: 0,
            totalStok: 0,
        }
    },
    async mounted() {
        try {
            const [barang, kategori] = await Promise.all([
                axios.get(`${API_URL}/barang`),
                axios.get(`${API_URL}/kategori`)
            ]);
            this.totalBarang = barang.data.data?.length || 0;
            this.totalKategori = kategori.data.data?.length || 0;
            this.totalStok = barang.data.data?.reduce((a, b) => a + parseInt(b.stok), 0) || 0;
        } catch (e) {}
    }
};