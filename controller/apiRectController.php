<?php
require_once "./model/rectModel.php";
require_once "./view/apiView.php";

class apiRectController {

    private $model;
    private $view;

    function __construct()
    {
        $this->model = new rectModel();
        $this->view = new apiView();
    }

    public function goToGetCountOfPreviousResults(){
        $results = $this->model->getCountOfPreviousResults();
        if ($results){
            $this->view->response($results, 200);
        } else {
            $this->view->response("Not content found", 404);
        }
    }

    function goToAddGameResult(){
        $body = $this->getBody();

        if ($body->victoria && !($body->desempate)){
            $id = $this->model->addGameResult(true, false, false);
            $this->getResponse($id);
        } else if ($body->empate) {
            $id = $this->model->addGameResult(false, true, false);
            $this->getResponse($id);
        } else if ($body->desempate){
            $id = $this->model->addGameResult(true, false, true);
            $this->getResponse($id);
        } else {
			$this->view->response("No se pudo decodear el json", 311);
		}
        
    }

    private function getResponse($id){
        if ($id != 0) {
            $this->view->response("El juego se aniadio con el id=$id", 200);
        } else {
            $this->view->response("El juego no se pudo aniadir", 500);
        }
    }

    private function getBody() {
        $bodyString = file_get_contents("php://input");
        return json_decode($bodyString); 
    } 
}