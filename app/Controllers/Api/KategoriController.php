<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\KategoriModel;

class KategoriController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new KategoriModel();
    }

    public function index()
    {
        return $this->response->setJSON([
            'status' => true,
            'data' => $this->model->findAll()
        ]);
    }

    public function show($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Kategori tidak ditemukan'
            ]);
        }
        return $this->response->setJSON(['status' => true, 'data' => $data]);
    }

    public function create()
    {
        $data = [
            'nama_kategori' => $this->request->getJSON()->nama_kategori ?? '',
        ];

        if (empty($data['nama_kategori'])) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => false,
                'message' => 'Nama kategori wajib diisi'
            ]);
        }

        $this->model->insert($data);
        return $this->response->setStatusCode(201)->setJSON([
            'status' => true,
            'message' => 'Kategori berhasil ditambahkan'
        ]);
    }

    public function update($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Kategori tidak ditemukan'
            ]);
        }

        $this->model->update($id, [
            'nama_kategori' => $this->request->getJSON()->nama_kategori ?? $data['nama_kategori'],
        ]);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Kategori berhasil diupdate'
        ]);
    }

    public function delete($id)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Kategori tidak ditemukan'
            ]);
        }

        $this->model->delete($id);
        return $this->response->setJSON([
            'status' => true,
            'message' => 'Kategori berhasil dihapus'
        ]);
    }
}