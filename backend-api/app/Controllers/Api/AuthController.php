<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;

class AuthController extends BaseController
{
    public function login()
    {
        $username = $this->request->getJSON()->username ?? '';
        $password = $this->request->getJSON()->password ?? '';

        $model = new UserModel();
        $user = $model->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Username atau password salah'
            ]);
        }

        $token = bin2hex(random_bytes(32));
        $model->update($user['id'], ['token' => $token]);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Login berhasil',
            'token' => $token
        ]);
    }

    public function logout()
    {
        $token = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $token);

        $model = new UserModel();
        $user = $model->where('token', $token)->first();

        if ($user) {
            $model->update($user['id'], ['token' => null]);
        }

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Logout berhasil'
        ]);
    }
}