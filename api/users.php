<?php

include ('config.php');
include ('curl.php');

$org_name = $_GET["org"];

// This is a base price per hour for users - R$ 18,00
$min_price = 18;

$org_uri = "https://api.github.com/orgs/".$org_name;
$org_members_uri = "https://api.github.com/orgs/".$org_name."/members";
$user_uri = "https://api.github.com/users/";

// Get the user logins from an organization and build an array of URIs 
// (e.g. array("api.github.com/members/memberX", "api.github.com/members/memberY") )
$members_uris_arr = array();
$members_arr = json_decode(curl_get_content($org_members_uri, $token));
foreach ($members_arr as $i => $member) {
	$members_uris_arr[$i] = $user_uri.$member->login;
}

// Use the built array to pass to the cURL function (curl_get_content_mt) that gets all the info for each user.
$developers_arr = curl_get_content_mt($members_uris_arr, $token);
foreach ($developers_arr as $i => $developer) {
	$developer->price = calculate_price($min_price, $developer->followers, $developer->public_repos); // add the user calculated price in users/developers array
}

// Prints the final JSON string that will be used by the client.
echo json_encode($developers_arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

/**
 * Function to calculate the user price based on FOLLOWERS and REPOS that this user has.
 * Each followers worths R$ 1,00 and each repo R$ 0,50.
 */
function calculate_price($minimum_price, $followers, $repos){
	$price = $minimum_price + ($followers * 1.0) + ($repos * 0.5);
	return number_format($price, 2, ',', '');;
}

?>