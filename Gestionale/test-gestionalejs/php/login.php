<?php

    /**
     * devo fare attenzione perchè le sessioni non vengono gestite correttamente.
     * E' come se le informazioni di una sessione non venissero salvate
    */

    require_once "header.php";
    require_once "database.php";

    if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "POST") {
        die("ERROR 400 Bad Request");
    }

    if (!isset($_SESSION)) {
        session_start();
    }

    // prende i dati di input
    $input_data = file_get_contents("php://input");
    $input = json_decode($input_data, true);

    if (isset($input["username"]) && isset($input["password"])) {
        if ($input["username"] == "" || $input["password"] == "") { // la richiesta non contiene lo username o la password
            // http_response_code(400); // Bad request
            $response = [
                "error" => true,
                "errorMessage" => "Richiesta errata: username o password mancanti.",
            ];
            echo json_encode($response);
            exit;
        }

        $username = $input["username"];
        $passwd = $input["password"];

        try {
            $query = "SELECT * FROM Users WHERE user_name=:username";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(":username", $username);
            
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) { // no user found
                $response = [
                    "error" => true,
                    "errorMessage" => "Errore: utente inesistente.",
                ];
                echo json_encode($response);
                exit;
            }

            if (!$user["attivato"]) { // sono stati rimossi i permessi all'utente
                $response = [
                    "error" => true,
                    "errorMessage" => "Errore: questa utenza non è più attiva.",
                ];
                echo json_encode($response);
                exit;
            }

            if (!password_verify($passwd, $user["password"])) { // password errata
                $response = [
                    "error" => true,
                    "errorMessage" => "Password errata, tentare di nuovo",
                ];
                echo json_encode($response);
                exit;
            };

            $user["password"] = "";

            $response = [
                "error" => false,
                "errorMessage" => "",
                "user" => $user,
            ];

            $_SESSION['id'] = $user['id'];
            $_SESSION['email'] = $username;

            echo json_encode($response);
            exit;
        } catch(PDOError $e) {
            echo json_encode(["error" => true, "errorMessage" => "Error during db connection"]);
        }
    }

    if (isset($_SESSION['id'])) {
        $query = "SELECT * FROM Users WHERE id=:id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":id", $_SESSION['id']);
        
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        $response = [
            'error' => false,
            'errorMessage' => "",
            'user' => $user,
        ];

        echo json_encode($response);
        exit;
    }
?>