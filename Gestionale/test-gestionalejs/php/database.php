<?php
    require_once "header.php";

    /* $servername = "aws-0-eu-central-1.pooler.supabase.com";
    $username = "postgres.mdrzrsuxitfcctdpzpco";
    $password = "OiAV47ft6bqiS6iO";
    $port = "6543";
    $dbname = "postgres";
    
    $dsn = "pgsql:host=$servername;port=$port;dbname=$dbname;"; */

    define("DB_HOST", "aws-0-eu-central-1.pooler.supabase.com");
    define("DB_USER", "postgres.mdrzrsuxitfcctdpzpco");
    define("DB_PASSWD", "OiAV47ft6bqiS6iO");
    define("DB_PORT", "6543");
    define("DB_NAME", "postgres");

    try {
        $dsn = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";";
        $pdo = new PDO($dsn, DB_USER, DB_PASSWD, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    } catch(PDOError $e) {
        $response = [
            "error" => true,
            "errorMessage" => "Error during connection to db",
        ];
        echo json_encode($response);
        exit;
    }
?>