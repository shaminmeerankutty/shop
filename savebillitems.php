<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include_once "controllers/helpers.php";
$helper = new helpers();

return $helper->savebillitem($_POST["billno"], $_POST["productid"], $_POST["qty"]);