const KategoriComponent = {
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
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-700">Manajemen Kategori</h2>
                <button @click="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Tambah Kategori
                </button>
            </div>
            <div class="bg-white rounded-xl shadow overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-blue-600 text-white">
                        <tr>
                            <th class="px-4 py-3">No</th>
                            <th class="px-4 py-3">Nama Kategori</th>
                            <th class="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in list" :key="item.id" class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">{{ i + 1 }}</td>
                            <td class="px-4 py-3">{{ item.nama_kategori }}</td>
                            <td class="px-4 py-3 flex gap-2">
                                <button @click="openModal(item)" class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                                <button @click="hapus(item.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="list.length === 0">
                            <td colspan="3" class="text-center py-6 text-gray-400">Belum ada data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Kategori</h3>
                <input v-model="form.nama_kategori" type="text" placeholder="Nama Kategori"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <div class="flex justify-end gap-2">
                    <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Batal</button>
                    <button @click="simpan" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return { list: [], showModal: false, form: { id: null, nama_kategori: '' } }
    },
    async mounted() { await this.load(); },
    methods: {
        async load() {
            const res = await axios.get(`${API_URL}/kategori`);
            this.list = res.data.data;
        },
        openModal(item = null) {
            this.form = item ? { id: item.id, nama_kategori: item.nama_kategori } : { id: null, nama_kategori: '' };
            this.showModal = true;
        },
        async simpan() {
            if (this.form.id) {
                await axios.put(`${API_URL}/kategori/${this.form.id}`, { nama_kategori: this.form.nama_kategori });
            } else {
                await axios.post(`${API_URL}/kategori`, { nama_kategori: this.form.nama_kategori });
            }
            this.showModal = false;
            await this.load();
        },
        async hapus(id) {
            if (confirm('Yakin hapus kategori ini?')) {
                await axios.delete(`${API_URL}/kategori/${id}`);
                await this.load();
            }
        },
        async logout() {
            await axios.post(`${API_URL}/logout`);
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            this.$router.push('/login');
        }
    }
};