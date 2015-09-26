<?php

include ('config.php');
include ('curl.php');

$org_name = $_GET["org"];

$min_price = 18;
$org_uri = "https://api.github.com/orgs/".$org_name;
$org_members_uri = "https://api.github.com/orgs/".$org_name."/members";
$user_uri = "https://api.github.com/users/";

$members_uris_arr = array();
$members = json_decode(curl_get_content($org_members_uri, $token));

// print_r($members);

foreach ($members as $i => $member) {
	$members_uris_arr[$i] = $user_uri.$member->login;
}

$developers_arr = curl_get_content_mt($members_uris_arr, $token);

foreach ($developers_arr as $i => $developer) {
	$developer->price = calculate_price($min_price, $developer->followers, $developer->public_repos);
}

echo json_encode($developers_arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

function calculate_price($minimum_price, $followers, $repos){
	$price = $minimum_price + ($followers * 1.0) + ($repos * 0.5);
	return number_format($price, 2, ',', '');;
}

?>