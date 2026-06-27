<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $token = $request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        if (empty($token)) {
            return response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Token tidak ditemukan'
            ]);
        }

        $model = new UserModel();
        $user = $model->where('token', $token)->first();

        if (!$user) {
            return response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Token tidak valid'
            ]);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}