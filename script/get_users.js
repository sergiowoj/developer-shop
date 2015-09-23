$(function(){
  $('#get_users').on('click', function(e){
    e.preventDefault();

    var org = $('#orgname').val();
    var orguri   = 'https://api.github.com/orgs/'+org+'/members';
    
    var output = "";

    $('#userslist').html('<img src="http://3.bp.blogspot.com/-FjddXJJsIv8/VeaoXmv8HQI/AAAAAAAAGww/PlCl0uSR_9g/s1600/loading.gif">');
    
    requestJSON(orguri, function(json) {
      if(org == '' || json.message == "Not Found") {
        $('#userslist').html("<div class='alert alert-danger'>Sorry, we didn't find '"+org+"' in GitHub</div>");
      } 
      else {
        json.forEach(function(user, i){
          console.log(user.login);
          output = output+
          '<tr class="user">'+
            '<td class="userinfo">'+
              '<img class="useravatar" src="'+user.avatar_url+'" width="80px">'+
              '<span class="username">'+user.login+'</span>'+
            '</td>'+
            '<td class="userprice">R$22/h</td>'+
            '<td class="useradd"><button type="submit" id="add_to_cart" class="btn btn-success">Add to cart</button></td>'+
          '</tr>';
        });
        $('#userslist').html(output); 
      } 
    });
  });

  /**
  * This function adds a developer to the cart.
  * Through an AJAX request, it sends a JSON string to the server and, 
  * if the process is successful, returns a message to the client.
  */
  function addToCart(username, priceperhour, hours) {
    var usruri = 'https://api.github.com/users/'+username;
    requestJSON(usruri, function(json){
      $.ajax({
        type: "POST",
        url: "api/cart.php?action=add",
        data: json,
        dataType: "json",
        success: function(result){
          console.log(result);
          updateCart();
        }
      });
    });
  }

  function updateCart(){
    $.ajax({
        type: "GET",
        url: "api/cart.php?action=get",
        dataType: "json",
        success: function(result){
          console.log(result);
          var cart = result.cart.products;
          var output = "";
          cart.forEach(function(user, i){
            console.log(user.login);
            output = output +
            '<tr class="user">'+
              '<td class="userinfo">'+
                '<img class="useravatar" src="'+user.avatar_url+'" width="80px">'+
                '<span class="username">'+user.login+'</span>'+
              '</td>'+
              '<td class="userprice">R$22/h</td>'+
              '<td class="useradd"><button type="submit" id="remove_from_cart" class="btn btn-danger">Remove from cart</button></td>'+
            '</tr>';
          });
          $('#cartbody').html(output); 
        }
      });
  }
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }


  addToCart("sergiowoj", 20, 20)
});