const Supplier = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-2xl font-bold mb-6">Data Supplier</h2>
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="p-3 border-b">Nama Supplier</th>
                        <th class="p-3 border-b">No Telepon</th>
                        <th class="p-3 border-b">Alamat</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in suppliers" :key="item.id" class="border-b">
                        <td class="p-3">{{ item.nama_supplier }}</td>
                        <td class="p-3">{{ item.no_telepon }}</td>
                        <td class="p-3">{{ item.alamat }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() { return { suppliers: [] } },
    mounted() {
        // Otomatis ambil data dari API saat halaman dibuka
        axios.get('/supplier').then(res => {
            this.suppliers = res.data;
        }).catch(err => console.error("Gagal ambil data supplier"));
    }
};