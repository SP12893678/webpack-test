<?php
    $user = "root";
    $password = "";
    $database = "listeningtrain_platform";
    $con = mysqli_connect("localhost",$user,$password,$database);
    $con -> query("set names utf8");

function sayHello(){
    echo 'hello';
}