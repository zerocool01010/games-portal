<?php
require_once './view/rectView.php';

class rectController {
    private $view;

    function __construct()
    {
        $this->view = new rectView();
    }

    function goToHomeGame(){
        $this->view->showGameHome();
    }

    function goToRectGame(){
        $this->view->showRectGame();
    }

    function goToRenderErrorPage(){
        $this->view->showRenderErrorPage();
    }
}