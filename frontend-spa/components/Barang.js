const BarangComponent = {
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
                <h2 class="text-2xl font-bold text-gray-700">Manajemen Barang</h2>
                <button @click="openModal()" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    + Tambah Barang
                </button>
            </div>
            <div class="bg-white rounded-xl shadow overflow-hidden">
                <table class="w-full text-left">
                    <thead class="bg-blue-600 text-white">
                        <tr>
                            <th class="px-4 py-3">No</th>
                            <th class="px-4 py-3">Kode</th>
                            <th class="px-4 py-3">Nama Barang</th>
                            <th class="px-4 py-3">Kategori</th>
                            <th class="px-4 py-3">Stok</th>
                            <th class="px-4 py-3">Harga</th>
                            <th class="px-4 py-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in list" :key="item.id" class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3">{{ i + 1 }}</td>
                            <td class="px-4 py-3">{{ item.kode_barang }}</td>
                            <td class="px-4 py-3">{{ item.nama_barang }}</td>
                            <td class="px-4 py-3">{{ item.nama_kategori }}</td>
                            <td class="px-4 py-3">{{ item.stok }}</td>
                            <td class="px-4 py-3">{{ item.harga }}</td>
                            <td class="px-4 py-3 flex gap-2">
                                <button @click="openModal(item)" class="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Edit</button>
                                <button @click="hapus(item.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Hapus</button>
                            </td>
                        </tr>
                        <tr v-if="list.length === 0">
                            <td colspan="7" class="text-center py-6 text-gray-400">Belum ada data</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h3 class="text-lg font-bold mb-4">{{ form.id ? 'Edit' : 'Tambah' }} Barang</h3>
                <input v-model="form.kode_barang" type="text" placeholder="Kode Barang"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input v-model="form.nama_barang" type="text" placeholder="Nama Barang"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <select v-model="form.id_kategori" class="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">-- Pilih Kategori --</option>
                    <option v-for="k in kategoriList" :key="k.id" :value="k.id">{{ k.nama_kategori }}</option>
                </select>
                <input v-model="form.stok" type="number" placeholder="Stok"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input v-model="form.harga" type="number" placeholder="Harga"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <textarea v-model="form.deskripsi" placeholder="Deskripsi (opsional)"
                    class="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <div class="flex justify-end gap-2">
                    <button @click="showModal = false" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Batal</button>
                    <button @click="simpan" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            list: [], kategoriList: [], showModal: false,
            form: { id: null, kode_barang: '', nama_barang: '', id_kategori: '', stok: 0, harga: 0, deskripsi: '' }
        }
    },
    async mounted() {
        await this.load();
        const res = await axios.get(`${API_URL}/kategori`);
        this.kategoriList = res.data.data;
    },
    methods: {
        async load() {
            const res = await axios.get(`${API_URL}/barang`);
            this.list = res.data.data;
        },
        openModal(item = null) {
            this.form = item
                ? { id: item.id, kode_barang: item.kode_barang, nama_barang: item.nama_barang, id_kategori: item.id_kategori, stok: item.stok, harga: item.harga, deskripsi: item.deskripsi }
                : { id: null, kode_barang: '', nama_barang: '', id_kategori: '', stok: 0, harga: 0, deskripsi: '' };
            this.showModal = true;
        },
        async simpan() {
            if (this.form.id) {
                await axios.put(`${API_URL}/barang/${this.form.id}`, this.form);
            } else {
                await axios.post(`${API_URL}/barang`, this.form);
            }
            this.showModal = false;
            await this.load();
        },
        async hapus(id) {
            if (confirm('Yakin hapus barang ini?')) {
                await axios.delete(`${API_URL}/barang/${id}`);
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