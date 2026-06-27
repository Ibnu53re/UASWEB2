<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BarangModel;

class BarangController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new BarangModel();
    }

    public function index()
    {
        return $this->response->setJSON([
            'status' => true,
            'data' => $this->model->getBarangWithKategori()
        ]);
    }

    public function show($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Barang tidak ditemukan'
            ]);
        }
        return $this->response->setJSON(['status' => true, 'data' => $data]);
    }

    public function create()
    {
        $json = $this->request->getJSON();
        $data = [
            'kode_barang'  => $json->kode_barang ?? '',
            'nama_barang'  => $json->nama_barang ?? '',
            'id_kategori'  => $json->id_kategori ?? null,
            'id_supplier'  => $json->id_supplier ?? null,
            'stok'         => $json->stok ?? 0,
            'harga'        => $json->harga ?? 0,
            'deskripsi'    => $json->deskripsi ?? '',
        ];

        if (empty($data['nama_barang'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => false,
                'message' => 'Nama barang wajib diisi'
            ]);
        }

        $this->model->insert($data);
        return $this->response->setStatusCode(201)->setJSON([
            'status' => true,
            'message' => 'Barang berhasil ditambahkan'
        ]);
    }

    public function update($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Barang tidak ditemukan'
            ]);
        }

        $json = $this->request->getJSON();
        $this->model->update($id, [
            'kode_barang'  => $json->kode_barang ?? $data['kode_barang'],
            'nama_barang'  => $json->nama_barang ?? $data['nama_barang'],
            'id_kategori'  => $json->id_kategori ?? $data['id_kategori'],
            'id_supplier'  => $json->id_supplier ?? $data['id_supplier'],
            'stok'         => $json->stok ?? $data['stok'],
            'harga'        => $json->harga ?? $data['harga'],
            'deskripsi'    => $json->deskripsi ?? $data['deskripsi'],
        ]);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Barang berhasil diupdate'
        ]);
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Barang tidak ditemukan'
            ]);
        }

        $this->model->delete($id);
        return $this->response->setJSON([
            'status' => true,
            'message' => 'Barang berhasil dihapus'
        ]);
    }
}