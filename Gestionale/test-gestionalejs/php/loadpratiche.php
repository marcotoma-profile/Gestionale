<?php
    /**
     * devo aggiungere il controllo che l'utente sia loggato
     */

     /**
      * azioni
      * 1 - primo load delle pratiche - necessita della mail con cui è stato fatto il login
      * 2 - load pratiche che hanno collegato almeno un dossier di cui l'utente è incaricato - necessita dell'email dell'utente
      */
    
     require_once "header.php";
     require_once "database.php";

     if (!isset($_SESSION)){
        session_start();
     }

     if (!isset($_SERVER["REQUEST_METHOD"])) {
        die("ERROR 404 bad request");
     }

     $action = $_GET['azione'];

     $email = $_GET['username'];

     if ($action != ''){
        try{
            switch($action) {
                case 1: $query = "SELECT p.*, u.user_name, a.nome from pratiche p join users u on p.\"incaricato\" = u.id join anagrafiche a on p.cliente=a.id where u.user_name=:user_name and p.stato='Aperta' order by prg_pratica;";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindParam(":user_name", $email);
                    break;
                default: break;
            }
            
            $stmt->execute();
            $pratiche = $stmt->fetchAll(PDO::FETCH_ASSOC);

            $listapratiche = [];

            foreach ($pratiche as $prt) {
                $listapratiche[] = $prt;
            }

            $response = [
                "error" => false,
                "errorMessage" => "",
                "pratiche" => $listapratiche,
            ];

            echo json_encode($response);
            exit;
        } catch(PDOError $e) {
            echo json_encode(["error" => true, "errorMessage" => "Error during db connection"]);
        }
    }

    $response = [
        'error' => true,
        'errorMessage' => 'Errore: nessuna email fornita',
    ];
    echo json_encode($response);
    exit;
?>