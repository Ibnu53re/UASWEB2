<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTableBarang extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'           => ['type' => 'INT', 'auto_increment' => true],
            'kategori_id'  => ['type' => 'INT'],
            'nama_barang'  => ['type' => 'VARCHAR', 'constraint' => 150],
            'stok'         => ['type' => 'INT', 'default' => 0],
            'satuan'       => ['type' => 'VARCHAR', 'constraint' => 50],
            'keterangan'   => ['type' => 'TEXT', 'null' => true],
            'created_at'   => ['type' => 'DATETIME', 'null' => true],
            'updated_at'   => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addPrimaryKey('id');
        $this->forge->addForeignKey('kategori_id', 'kategori', 'id');
        $this->forge->createTable('barang');
    }

    public function down()
    {
        $this->forge->dropTable('barang');
    }
}