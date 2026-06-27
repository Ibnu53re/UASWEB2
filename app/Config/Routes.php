<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

$routes->options('(:any)', static function () {
    return response()->setStatusCode(200);
});

// Public Routes - TANPA filter auth
$routes->post('api/login', 'Api\AuthController::login', ['filter' => 'cors']);
$routes->get('api/barang', 'Api\BarangController::index', ['filter' => 'cors']);
$routes->get('api/kategori', 'Api\KategoriController::index', ['filter' => 'cors']);

// Protected Routes
$routes->group('api', ['filter' => 'auth'], static function ($routes) {
    $routes->post('logout', 'Api\AuthController::logout');

    $routes->get('kategori', 'Api\KategoriController::index');
    $routes->get('kategori/(:num)', 'Api\KategoriController::show/$1');
    $routes->post('kategori', 'Api\KategoriController::create');
    $routes->put('kategori/(:num)', 'Api\KategoriController::update/$1');
    $routes->delete('kategori/(:num)', 'Api\KategoriController::delete/$1');

    $routes->get('barang', 'Api\BarangController::index');
    $routes->get('barang/(:num)', 'Api\BarangController::show/$1');
    $routes->post('barang', 'Api\BarangController::create');
    $routes->put('barang/(:num)', 'Api\BarangController::update/$1');
    $routes->delete('barang/(:num)', 'Api\BarangController::delete/$1');
});