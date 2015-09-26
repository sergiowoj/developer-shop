<?php

include ('curl.php');

$org_name = $_GET["org"];

$min_price = 18;
$org_uri = "https://api.github.com/orgs/".$org_name;
$org_members_uri = "https://api.github.com/orgs/".$org_name."/members";
$user_uri = "https://api.github.com/users/";
// $repuri = "https://api.github.com/users/".$user."/repos";

$members_uris_arr = array();
$members = json_decode(curl_get_content($org_members_uri));

foreach ($members as $i => $member) {
	$members_uris_arr[$i] = $user_uri.$member->login;
}

$developers_arr = curl_get_content_mt($members_uris_arr);

foreach ($developers_arr as $i => $developer) {
	$developer->price = calculate_price($min_price, $developer->followers, $developer->public_repos);
}

echo json_encode($developers_arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

function calculate_price($minimum_price, $followers, $repos){
	$price = $minimum_price + ($followers * 1.0) + ($repos * 0.5);
	return number_format($price, 2, ',', '');;
}

// /**
//  * 
//  */
// function curl_get_content($url){
// 	$ch = curl_init();
// 	curl_setopt($ch, CURLOPT_URL, $url);

// 	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// 	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
// 	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: token c8c1aefb767dd3770d840515df3bb07c84253f48')); 
// 	curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
// 	// curl_setopt($ch, CURLOPT_VERBOSE, 1);
// 	// curl_setopt($ch, CURLOPT_HEADER, 1);

// 	$output = curl_exec($ch);

// 	// $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
// 	// $header = substr($output, 0, $header_size);
// 	// $body = substr($output, $header_size);
// 	// echo $header;
	
// 	if(curl_errno($ch)){
// 		curl_close($ch);
// 	    return 'Curl error: ' . curl_error($ch);
// 	} else {
// 		curl_close($ch);
// 		return $output;
// 	}
// }

// /**
//  * 
//  */
// function curl_get_content_mt($urls){
// 	$nodes = $urls;
// 	$node_count = count($nodes);
// 	$curl_arr = array();
// 	$master = curl_multi_init();

// 	for($i = 0; $i < $node_count; $i++)
// 	{
// 	    $url = $nodes[$i];
// 	    $curl_arr[$i] = curl_init($url);
// 	    curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, 1);
// 		curl_setopt($curl_arr[$i], CURLOPT_SSL_VERIFYPEER, 0);
// 		curl_setopt($curl_arr[$i], CURLOPT_HTTPHEADER, array('Authorization: token c8c1aefb767dd3770d840515df3bb07c84253f48')); 
// 		curl_setopt($curl_arr[$i], CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
// 	    curl_multi_add_handle($master, $curl_arr[$i]);
// 	}

// 	do {
// 	    curl_multi_exec($master, $running);
// 	} while($running > 0);

// 	for($i = 0; $i < $node_count; $i++)
// 	{
// 	    $results[] = json_decode(curl_multi_getcontent($curl_arr[$i]));
// 	}
	
// 	return $results;
// }



?>