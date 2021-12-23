<?php
require_once "./model/rectModel.php";

class apiRectController {

    private $model;

    function __construct()
    {
        $this->model = new rectModel();
    }

    function goToAddGameResult(){
        $this->model->addGameResult($victory, $draw, $undraw);
    }
}