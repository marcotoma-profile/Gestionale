<?php

    require_once 'header.php';

    if (!isset($_SESSION)) {
        session_start();
    }

    if (!$_SESSION["email"]) {
        header("Location: login/");
    }
?>