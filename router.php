<?php
require_once 'controller/rectController.php';

    define('BASE_URL', '//'.$_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . dirname($_SERVER['PHP_SELF']).'/');

    $rectController = new rectController();

    if (!empty($_GET['action'])) {
        $action = $_GET['action'];
    } else {
        $action = 'home'; 
    }

    $parameters = explode('/', $action);

    switch($parameters[0]){
        case 'home':
            $rectController->goToHomeGame();
            break;
        case 'rect':
            $rectController->goToRectGame();
            break;
        case 'snake':
            $rectController->goToSnake();
            break;
        default:
            $rectController->goToRenderErrorPage();
    }