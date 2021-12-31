<?php

class rectModel {
    private $conn;

    function __construct()
    {
        $this->conn = new PDO('mysql:host=localhost;'.'dbname=rectanglesgame;charset=utf8', 'root', '');
    }

    public function getCountOfPreviousResults(){
        $s = $this->conn->prepare('SELECT COUNT(*) AS numbgames FROM games');
        $s->execute();
        $results = $s->fetchAll(PDO::FETCH_OBJ);
        return $results;
    }

    public function addGameResult($v, $e, $d){
        $s = $this->conn->prepare('INSERT INTO games(victoria, empate, desempate) VALUES(?, ?, ?)');
        $s->execute(array($v, $e, $d));
        return $this->conn->lastInsertId();
    }
}