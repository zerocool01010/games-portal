<?php
require_once "./libs/smarty-3.1.39/libs/Smarty.class.php";

class rectView {

    function __construct()
    {
        $this->smarty = new Smarty();
        $this->smarty->assign('BASE_URL', BASE_URL);
    }

    function showGameHome(){
        $this->smarty->assign('title', 'Games portal by Manuel');
        $this->smarty->display('home.tpl');
    }

    function showRectGame(){
        $this->smarty->assign('title', 'Rectangles Game');
        $this->smarty->display('indexGame.tpl');
    }

    public function showRenderErrorPage(){
        $this->smarty->display('error.tpl');
    }
}