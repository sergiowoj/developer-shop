<?php

include ('config.php');
include ('curl.php');

if(!session_id()){
	session_start();	
}

if(!isset($_SESSION["cart"])){
	$_SESSION["cart"] = array();
	$_SESSION["cart"]["order_total"] = 0;
	$_SESSION["cart"]["products"] = array();
}

if(isset($_GET["action"])){
	$action = $_GET["action"];

	if ($action == "add"){
		if(isset($_GET["username"]) && isset($_GET["price"])){
			$username = $_GET["username"];
			$price = $_GET["price"];
			add_to_cart($username, $price, $token);
			update_order_total();
		} else {
			echo json_encode(array("message" => "Error: missing username parameter."));
		}
	}
	else if ($action == "remove"){
		if(isset($_GET["username"])){
			remove_from_cart($_GET["username"]);
			update_order_total();
		} else {
			echo json_encode(array("message" => "Error: missing username parameter."));
		}
	}
	else if($action == "update"){
		if(isset($_GET["username"]) && isset($_GET["hours"])){
			$username = $_GET["username"];
			$hours = $_GET["hours"];
			update_user_total($username, $hours);
			update_order_total();
		} else {
			echo json_encode(array("message" => "Error: missing username parameter."));
		}
	}
	else if ($action == "clear"){
		clear_cart();
		update_order_total();
	}
	else if ($action == "get"){
		get_cart();
	}
}

function get_cart(){
	if(count($_SESSION["cart"]["products"]) == 0){
		echo json_encode(array("message" => "Your cart is empty."));
	} else {
		echo json_encode($_SESSION);
	}
}

function add_to_cart($username, $price, $token){
	$already_in = false;
	if(isset($_SESSION["cart"])){
		foreach ($_SESSION["cart"]["products"] as $i => $product) {
			if($product->login == $username){
				$already_in = true;
			}
		}
		if($already_in){
			echo json_encode(array("message" => "'$username' is already in your cart."));
		} else {
			$product = json_decode(curl_get_content("https://api.github.com/users/".$username, $token));
			$product->price = number_format($price, 2, ',', '');
			$product->hours = 1;
			$total_price = $price * $product->hours;
			$product->total_price = number_format($total_price, 2, ',', '');
			$_SESSION["cart"]["products"][] = $product;
			echo json_encode(array("message" => "Developer added to cart."));
		}
		
	}
}

function update_user_total($username, $hours){
	foreach ($_SESSION["cart"]["products"] as $i => $product) {
		if($product->login == $username){
			$total_price = $product->price * $hours;
			$product->total_price = number_format($total_price, 2, ',', ''); 
			$product->hours = $hours;
			echo json_encode(array("message" => "'$username' updated."));		
		}
	}
}

function remove_from_cart($username){
	foreach ($_SESSION["cart"]["products"] as $i => $product) {
		if($product->login == $username){
			unset($_SESSION["cart"]["products"][$i]);
			echo json_encode(array("message" => "'$username' removed from cart."));		
		}
	}
}

function update_order_total(){
		$order_total = 0;
		foreach ($_SESSION["cart"]["products"] as $i => $product) {
			$order_total = $order_total + $product->total_price;
		}
		$_SESSION["cart"]["order_total"] = number_format($order_total, 2, ',', '');
}

function clear_cart(){
	$_SESSION["cart"]["order_total"] = 0;
	$_SESSION["cart"]["products"] = array();
	// unset($_SESSION["cart"]["order_total"]);
	// unset($_SESSION["cart"]["products"]);
	echo json_encode(array("message" => "Your cart is now empty."));
}
?>