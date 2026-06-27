<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\HistoriModel;

class Histori extends ResourceController {
    public function index() {
        // Menggunakan findAll() untuk mengambil semua data
        return $this->respond((new HistoriModel())->findAll());
    }
}