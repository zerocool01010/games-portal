<?php
require_once "model/rectModel.php";
require_once 'libs/Router.php';
require_once 'controller/apiRectController.php';

$router = new Router();

$router->addRoute('game', 'POST', 'apiRectController', 'goToAddGameResult');

$router->route($_GET["resource"], $_SERVER['REQUEST_METHOD']);