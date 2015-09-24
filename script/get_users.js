

$(function(){


  $('#get_users').on('click', function(e){
    e.preventDefault();

    var org = $('#orgname').val();
    var orguri   = 'https://api.github.com/orgs/'+org+'/members';
    var usruri   = 'https://api.github.com/users/';
    var output = "";

    $('#userslist').html('<div style="text-align:center"><img src="http://3.bp.blogspot.com/-FjddXJJsIv8/VeaoXmv8HQI/AAAAAAAAGww/PlCl0uSR_9g/s1600/loading.gif"></div>');
    
    requestJSON(orguri, function(json) {
      if(org == '' || json.message == "Not Found") {
        $('#userslist').html("<div class='alert alert-danger'>Sorry, we didn't find '"+org+"' in GitHub</div>");
      } 
      else {
        json.forEach(function(user, i){
          console.log(user.login);
          
          requestJSON(usruri+user.login, function(details) {
            output = output +
            '<div class="user col-sm-4" >'+
              '<div class="wrapper">'+
                '<div class="user-avatar">'+
                  '<img src="'+details.avatar_url+'" width="80px">'+
                '</div>'+
                '<div class="user-info">'+
                  '<div class="username"><a href="http://www.github.com/'+details.login+'">'+details.name+'</a></div>'+
                  '<p>'+details.location+' followers &nbsp;&bull;&nbsp; following '+details.following+'</p>'+
                '</div>'+
                '<div class="user-buy">'+
                  '<div class="user-price">R$22/h</div>'+
                  '<div class="user-add" data-username="'+details.login+'" ><button type="submit" class="add-to-cart btn btn-success">+ Add to cart</button></div>'+
                '</div>'+
                '<div class="clearfix"></div>'+
              '</div>'+
            '</div>';
            $('#userslist').html(output);
          });
        });
      } 
    });
  });

  $('body').on('click', '.add-to-cart', function(e){
    e.preventDefault();
    addToCart($(this).parent().data("username"), 20, 20);
  });

  $('body').on('click', '.remove-from-cart', function(e){
    e.preventDefault();
    console.log("Clicked");
    removeFromCart($(this).parent().data("username"));
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

  function removeFromCart(username){
    $.ajax({
        type: "GET",
        url: "api/cart.php?action=remove&username="+username,
        dataType: "json",
        success: function(result){
          console.log(result);
          updateCart();
        }
      });
  }

  function updateCart(){
    $.ajax({
        type: "GET",
        url: "api/cart.php?action=get",
        dataType: "json",
        success: function(result){
          console.log(result);

          if(result.message == "Your cart is empty.") {
            $('#cartbody').html("Your cart is empty."); 
          } else {
            var cart = result.cart.products;
            var output = "";
            var company = "";
            $.each(cart, function(){
              if(this.company != ""){ company = "Works at "+this.company; } 
              else { company = ""; }
              output = output +
              '<tr class="user">'+
                '<td>'+
                  '<div class="user-avatar">'+
                    '<img src="'+this.avatar_url+'" width="80px">'+
                  '</div>'+
                  '<div class="user-info">'+
                    '<div class="username"><span class="name">'+this.name+'</span> | <a href="http://www.github.com/'+this.login+'">'+this.login+'</a></div>'+
                    '<p>'+this.followers+' followers &nbsp;&bull;&nbsp; following '+this.following+' &nbsp;&bull;&nbsp; '+this.public_repos+' repos <br> '+company+'</p>'+
                  '</div>'+
                '</td>'+
                '<td class="userprice">R$22/h</td>'+
                '<td class="hoursselected">2h</td>'+
                '<td class="total">R$44</td>'+
                '<td class="userremove" data-username="'+this.login+'"><button type="submit" class="remove-from-cart btn btn-danger">Remove from cart</button></td>'+
              '</tr>';
            });
            $('#cartbody').html(output); 
          }
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

  updateCart();
});