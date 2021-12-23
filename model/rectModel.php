<?php

class rectModel {
    private $conn;

    function __construct()
    {
        $this->conn = new PDO('mysql:host=localhost;'.'dbname=rectanglesgame;charset=utf8', 'root', '');
    }

    public function addGameResult($v, $e, $d){
        $s = $this->conn->prepare('INSERT INTO games(victoria, empate, desempate) VALUES(?, ?, ?)');
        $s->execute(array($v, $e, $d));
        return $this->conn->lastInsertId();
    }
}