<?php
namespace App\Controllers\Api;
use CodeIgniter\RESTful\ResourceController;
use App\Models\SupplierModel;

class Supplier extends ResourceController {
    public function index() {
        return $this->respond((new SupplierModel())->findAll());
    }
}