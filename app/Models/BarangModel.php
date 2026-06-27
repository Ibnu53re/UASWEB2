<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table      = 'barang';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_barang', 'nama_barang', 'id_kategori', 'id_supplier', 'stok', 'harga', 'deskripsi'];
    protected $useTimestamps = false;

    public function getBarangWithKategori()
    {
        return $this->select('barang.*, kategori.nama_kategori')
                    ->join('kategori', 'kategori.id = barang.id_kategori', 'left')
                    ->findAll();
    }
}