const Histori = {
    template: `
        <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-2xl font-bold mb-6">Histori Barang</h2>
            <table class="w-full text-left border-collapse">
                <thead class="bg-gray-100">
                    <tr><th class="p-3">Barang ID</th><th class="p-3">Jenis</th><th class="p-3">Jumlah</th><th class="p-3">Tanggal</th></tr>
                </thead>
                <tbody>
                    <tr v-for="item in histori" :key="item.id" class="border-b">
                        <td class="p-3">{{ item.id_barang }}</td>
                        <td class="p-3">{{ item.jenis_transaksi }}</td>
                        <td class="p-3">{{ item.jumlah }}</td>
                        <td class="p-3">{{ item.tanggal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    data() { return { histori: [] } },
    mounted() {
        axios.get('/histori').then(res => this.histori = res.data);
    }
};