<?php
    require_once 'header.php';
    include('database.php');
    
    if (!isset($_SERVER["REQUEST_METHOD"]) || $_SERVER["REQUEST_METHOD"] != "POST") {
        die("ERROR 400 Bad Request");
    }

    if (!isset($_SESSION)) {
        session_start();
    }

    $response = new stdClass();
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['username']) && isset($input['password'])) {
        if(preg_match('/[\s\'\"\`$<>~\/\\|;{}\[\]()]/m', $input["password"]) || preg_match('/[\s\'\"\`$<>~\/\\|;{}\[\]()]/m', $input["username"])){
            $response->error = true;
            $responss->errorMessage = "Nome utente o password errati.";
        } else {
            $username = $input['username'];
            $password = $input['password'];

            $query = "SELECT id, attivato, u.password, is_admin FROM Users u WHERE u.user_name=:username";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':username', $username);
            $stmt->execute();

            if ($stmt->rowCount() == 0) {
                $response->error = true;
                $response->errorMessage = 'Nome utente o password errati'; // Nome utente inesistente
            }
            else {
                $retValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $checkAttivato = $retValues[0]['attivato'];
                if (!$checkAttivato) {
                    $response->error = true;
                    $response->errorMesssage = 'Account disattivato'; // L'utente esiste ma il suo account è stato disattivato
                } else {
                    $checkPassword = $retValues[0]['password'];

                    if (password_verify($password, $retValues[0]['password'])) {
                        if (isset($_SESSION)) {
                            session_regenerate_id(true);
                        }

                        $_SESSION['id'] = $username;
                        $_SESSION['account_id'] = $retValues[0]['id'];
                        if ($retValues[0]['is_admin']) {
                            $_SESSION['admin'] = $retValues[0]['is_admin'];
                        }
                    } else {
                        $response->error = true;
                        $response->errorMessage = 'Nome utente o password errati';
                    }
                }
            }
        }

    }

    if (isset($_SESSION['id'])) {
        $response->error = false;
        $response->username = $_SESSION['id'];
        $response->id = $_SESSION['account_id'];
        if (isset($_SESSION['admin']) && $_SESSION['admin'] === true) {
            $response->isAdmin = true;
        } else {
            $response->isAdmin = false;
        }
    } else {
        $response->error = true;
    }

    echo json_encode($response);
?>