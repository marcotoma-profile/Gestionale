<?php
    require_once "header.php";
    include "database.php";

    if (!isset($_SESSION)) {
        session_start();
    }

    if (!isset($_GET["azione"])){
        $response = [
            "error" => true,
            "errorMessage" => "Errore: azione necessaria."
        ];
        echo json_encode($response);
        exit;
    }

    $azione = $_GET['azione'];

    try {
        $response = [];
        switch($azione) {
            case 1: // load della lista di utenti
                $response = loadUserList($pdo);
                break;
            case 2: // creazione di un nuovo utente
                $response = createNewUser($pdo);
                break;
        };

        echo json_encode($response);
        exit;
    } catch (PDOError $e) {
        // gestisco l'errore
    }


    function loadUserList($pdo) {
        $username = '';
        if (isset($_GET['username'])) {
            $username = $_GET['username'];
        };

        $query = "SELECT id, user_name, is_admin, attivato from users where user_name!=:username";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":username", $username);
        
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $userlist = [];
        foreach ($users as $usr) {
            $userlist[] = $usr;
        }

        $response = [
            'error' => false,
            'errorMessage' => '',
            'users' => $userlist, 
        ];
        return $response;
    }

    function createNewUser($pdo) {
        $input_data = file_get_contents("php://input");
        $input = json_decode($input_data, true);
        if (!isset($input['username']) || !isset($input['password'])) {
            $response = [
                'error' => true,
                'errorMessage' => 'Errore: username o password mancanti.'
            ];
            return $response;
        }
        
        $username = $input['username'];
        $email = '';
        $password = $input['password'];
        $password = password_hash($password, PASSWORD_BCRYPT);
        $isAdmin = $input['isAdmin'];
        
        if (isset($input['email'])) {
            $email = $input['email'];
        }

        if (checkUserPresent($pdo, $username)) {
            // errore: esiste già un utente con questo nome
            $response = [
                'error' => true,
                'errorMessage' => 'Errore: username già utilizzato per un altro utente',
            ];
            return $response;
        }
        
        $query = "insert into users (user_name, email, password, is_admin) values (:username, :email, :password, :isAdmin) returning id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password);
        $stmt->bindValue(":isAdmin", $isAdmin ? 1 : 0, PDO::PARAM_INT);
        
        $stmt->execute();
        $userId = $stmt->fetchColumn();

        $response = [
            'error' => false,
            'errorMessage' => '',
            'lastId' => $userId,
        ];
        return $response;
    }

    function checkUserPresent($pdo, $username) {
        $query = "select count(distinct id) from users where user_name=:username";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":username", $username);
        
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user > 0) {
            return true;
        }
        return false;
    }
    
?>