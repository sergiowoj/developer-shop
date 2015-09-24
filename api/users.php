<?php
// var org = $('#orgname').val();
// var orguri   = 'https://api.github.com/orgs/'+org+'/members';
// var usruri   = 'https://api.github.com/users/';
// var output = "";
// requestJSON(orguri, function(json) {
//   if(org == '' || json.message == "Not Found") {
//     $('#userslist').html("<div class='alert alert-danger'>Sorry, we didn't find '"+org+"' in GitHub</div>");
//   } 
//   else {
//     json.forEach(function(user, i){
//       console.log(user.login);
      
//       requestJSON(usruri+user.login, function(details) {
//         output = output +
//         '<div class="user col-sm-4" >'+
//           '<div class="wrapper">'+
//             '<div class="user-avatar">'+
//               '<img src="'+details.avatar_url+'" width="80px">'+
//             '</div>'+
//             '<div class="user-info">'+
//               '<div class="username"><a href="http://www.github.com/'+details.login+'">'+details.name+'</a></div>'+
//               '<p>'+details.location+' followers &nbsp;&bull;&nbsp; following '+details.following+'</p>'+
//             '</div>'+
//             '<div class="user-buy">'+
//               '<div class="user-price">R$22/h</div>'+
//               '<div class="user-add" data-username="'+details.login+'" ><button type="submit" class="add-to-cart btn btn-success">+ Add to cart</button></div>'+
//             '</div>'+
//             '<div class="clearfix"></div>'+
//           '</div>'+
//         '</div>';
//         $('#userslist').html(output);
//       });
//     });
//   } 
// });


// $org = $_GET["org"];
$org_name = "vtex";

$org_uri = "https://api.github.com/orgs/".$org_name;
$org_members_uri = "https://api.github.com/orgs/".$org_name."/members";
$user_uri = "https://api.github.com/users/";
// $repuri = "https://api.github.com/users/".$user."/repos";

$members_uris_arr = array();
$members = json_decode(curl_get_content($org_members_uri));

foreach ($members as $i => $member) {
	$members_uris_arr[$i] = $user_uri.$member->login;
}
// print_r($members_uris_arr);

echo json_encode(curl_get_content_mt($members_uris_arr));

// $members_json = curl_get_content($org_members_uri);
// $members_data = json_decode($members_json);

// $developers = array();

// foreach ($members_data as $i => $member) {
// 	// echo $member->login;
// 	$developers[$i] = json_decode(curl_get_content($user_uri.$member->login));
// }

// echo json_encode($developers);



function curl_get_content($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: token c8c1aefb767dd3770d840515df3bb07c84253f48')); 
	curl_setopt($ch, CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
	// curl_setopt($ch, CURLOPT_VERBOSE, 1);
	// curl_setopt($ch, CURLOPT_HEADER, 1);

	$output = curl_exec($ch);

	// $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
	// $header = substr($output, 0, $header_size);
	// $body = substr($output, $header_size);
	// echo $header;
	
	if(curl_errno($ch)){
		curl_close($ch);
	    return 'Curl error: ' . curl_error($ch);
	} else {
		curl_close($ch);
		return $output;
	}
}

function curl_get_content_mt($urls){
	$nodes = $urls;
	$node_count = count($nodes);
	$curl_arr = array();
	$master = curl_multi_init();

	for($i = 0; $i < $node_count; $i++)
	{
	    $url = $nodes[$i];
	    $curl_arr[$i] = curl_init($url);
	    curl_setopt($curl_arr[$i], CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl_arr[$i], CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($curl_arr[$i], CURLOPT_HTTPHEADER, array('Authorization: token c8c1aefb767dd3770d840515df3bb07c84253f48')); 
		curl_setopt($curl_arr[$i], CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');
	    curl_multi_add_handle($master, $curl_arr[$i]);
	}

	do {
	    curl_multi_exec($master, $running);
	} while($running > 0);


	for($i = 0; $i < $node_count; $i++)
	{
	    $results[] = json_decode(curl_multi_getcontent($curl_arr[$i]));
	}
	

	return $results;
}



?>