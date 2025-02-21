<?php
    /**
     * qui devo implementare la logica per il logout, ma devo prima risolvere il problema con le sessioni
     */

     session_start();

     // distruggo la sessione in corso

     if (isset($_SESSION)) {
        session_unset();
        session_destroy();
     }
?>