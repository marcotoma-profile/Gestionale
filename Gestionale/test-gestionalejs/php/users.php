<?php
    require_once "headers.php";
    require_once "database.php";

    if (!isset($_SESSION)) {
        session_start();
    }

    if (!isset($_GET["azione"]) || !isset($_GET['username'])){
        $response = [
            "error" => true,
            "errorMessage" => "Errore: mancano alcuni parametri."
        ];
        echo json_encode($response);
        exit;
    }

    $azione = $_GET['azione'];
    $username = $_GET['username'];

    try {
        switch($azione) {
            case 1:
                $query = "SELECT id, user_name, is_admin, attivato from users where user_name!=:username";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":username", $username);
                break;
        }
    } catch (PDOError $e) {
        // gestisco l'errore
    }
    
?>