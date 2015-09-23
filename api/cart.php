<?php

if(!session_id()){
	session_start();	
}

if(!isset($_SESSION["cart"])){
	$_SESSION["cart"] = array();
}

if(isset($_GET["action"])){
	$action = $_GET["action"];

	if ($action == "add"){
		$developer = $_POST;
		add_to_cart($developer);
	}
	else if ($action == "remove"){
		remove_from_cart($username);
	}
	else if ($action == "clear"){
		clear_cart();
	}
	else if ($action == "get"){
		get_cart();
	}
}

function get_cart(){
	echo json_encode($_SESSION);
}

function add_to_cart($developer){
	if(isset($_SESSION["cart"])){
		$_SESSION["cart"]["products"][] = $developer;
		echo json_encode(array("message" => "Developer added to cart."));
	}
}

function remove_from_cart($username){
	foreach ($_SESSION["cart"]["products"] as $i => $product) {
		if($product["username"] == $username){
			unset($_SESSION["cart"]["products"][$i]);
		}
	}
}

function clear_cart(){
	unset($_SESSION["cart"]);
}


?>