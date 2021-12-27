<?php

class apiView{

    public function response($data, $status) { 
        header("Content-Type: application/json");
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header("HTTP/1.1 " . $status . " " . $this->_requestStatus($status)); 
        echo json_encode($data); 
    }
    
    private function _requestStatus($code){
        $status = array( 
            200 => "OK",
			311 => "Decoding failed",
            404 => "Not found",
            500 => "Internal Server Error"
          );
          return (isset($status[$code]))? $status[$code] : $status[500];
    }
}