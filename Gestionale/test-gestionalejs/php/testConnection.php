<?php
    require_once "header.php";
    require_once "database.php";

    try {
        $pdo = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $response = array("message" => "Connessione riuscita");
        echo json_encode($response);
    } catch (PDOException $e){
        error_log("Errore: " . $e->getMessage());

        $response = array("message" => "Errore di connessione");
        echo json_encode($response);
    }
    
?>