$(function(){

  /**
  * Click handlers.
  */
  // Click handler for Search button.
  $('#get_users').on('click', function(e){
    e.preventDefault();

    var org_name = $('#orgname').val();

    $('#userslist').html('<div style="text-align:center"><img src="http://3.bp.blogspot.com/-FjddXJJsIv8/VeaoXmv8HQI/AAAAAAAAGww/PlCl0uSR_9g/s1600/loading.gif"></div>');
    if(org_name != ''){
      getOrganizationUsers(org_name);
    } else {
      $('#userslist').html("<div class='alert alert-danger'>Nothing to search.</div>");
    }
  });

  //Click handler for 'Add to cart' button.
  $('body').on('click', '.add-to-cart', function(e){
    e.preventDefault();
    addToCart($(this).parent().data("username"), $(this).parent().data("price"));
  });

  //Click handler for 'x' (remove) button.
  $('body').on('click', '.remove-from-cart', function(e){
    e.preventDefault();
    console.log("Clicked");
    removeFromCart($(this).parent().data("username"));
  });

  // Click handler for 'Update' button.
  $('body').on('click', '.update', function(e){
    e.preventDefault();
    updateTotal($(this).prev().data("username"), $(this).prev().val());
  });

  /**
  * This function gets the members from the choosen organization.
  * Sends an AJAX GET request to the API with the name of the organization and returns a JSON string with all members info.
  * Build the users list HTML with the returned result.
  */
  function getOrganizationUsers(organization) {
    var org_uri   = 'https://api.github.com/orgs/'+organization;
    var org_members_uri   = 'https://api.github.com/orgs/'+organization+'/members';
    var output = "";
    requestJSON(org_members_uri, function(org_members_json) { // get members from organization
      if(org_members_json.message == "Not Found") {
        $('#organization').html('');
        $('#userslist').html("<div class='alert alert-danger'>'"+organization+"' not found in GitHub.</div>");
      } else {
        requestJSON(org_uri, function(org_json){ // get organization info to show on search result header
          if (org_json.blog != "") { blog = 'Website <a href="'+org_json.blog+'">'+org_json.blog+'</a>'; }
          $('#organization').html(
            '<div class="col-sm-12 wrapper">'+
              '<img width="70px" src="'+org_json.avatar_url+'">'+
              '<div class="org-info">'+
                '<h3>'+org_json.name+'</h3>'+
                'GitHub <a href="'+org_json.html_url+'">'+org_json.html_url+'</a><br>'+
                blog+
              '</div>'+
            '</div>'+
            '<div class="clearfix"></div>'
            );
        });
        
        requestJSON("api/users.php?org="+organization, function(users) { // get each member info
          if(users.length == 0){
            $('#userslist').html("<div class='alert alert-danger'>No users found for this organization.</div>");
          } else {
            $.each(users, function(){
              if(this.name == null || this.name == ""){ name = this.login; } else { name = this.name };
              if(this.location == null || this.location == ""){ user_location = "" } else { user_location = this.location; };
              output = output +
              '<div class="user col-sm-4" >'+
                '<div class="wrapper">'+
                  '<div class="user-avatar">'+
                    '<img src="'+this.avatar_url+'" width="80px">'+
                  '</div>'+
                  '<div class="user-info">'+
                    '<div class="username"><a href="http://www.github.com/'+this.login+'">'+name+'</a></div>'+
                    '<p>'+this.followers+' followers &nbsp;&bull;&nbsp; '+this.public_repos+' repos <br> '+user_location+'</p>'+
                  '</div>'+
                  '<div class="user-buy">'+
                    '<div class="user-price">R$ '+this.price+'/h</div>'+
                    '<div class="user-add" data-username="'+this.login+'" data-price="'+this.price+'" ><button type="submit" class="add-to-cart btn btn-success">+ Add to cart</button></div>'+
                  '</div>'+
                  '<div class="clearfix"></div>'+
                '</div>'+
              '</div>';
            });
            $('#userslist').html(output);
          }
        });
      } 
    });
  }

  /**
  * This function adds a developer to the cart.
  * Sends an AJAX GET request to the API with the username and the price of the selected developer.
  * Update cart if the request is successful.
  */
  function addToCart(username, price) {
      requestJSON("api/cart.php?action=add&username="+username+"&price="+price, function(response){
        updateCart();
      });
  }

  /**
  * This function removes a developer from the cart.
  * Sends an AJAX GET request to the API with the username to be removed.
  * Update cart if the request is successful.
  */
  function removeFromCart(username){
    requestJSON("api/cart.php?action=remove&username="+username, function(response){
      updateCart();
    });
  }

  /**
  * This function updates the total price of an user in the shopping cart.
  * Sends an AJAX GET request to the API with the username and the qty of hours selected.
  * Update cart if the request is successful.
  */
  function updateTotal(username, hours){
    requestJSON("api/cart.php?action=update&username="+username+"&hours="+hours, function(response){
      updateCart();
    });
  }

  /**
  * This function updates the whole shopping cart with the latest state returned from the API.
  * Sends an AJAX GET request to the API to get all cart info (order_total and products - developers)
  * Build the cart HTML structure with the new info.
  */
  function updateCart(){
    requestJSON("api/cart.php?action=get", function(response){
      if(response.message == "Your cart is empty.") {
        $('#cartbody').html("Your cart is empty."); 
        $('#order-total').html("0,00");
      } else {
        var products = response.cart.products;
        var output = "";
        var company = "";
        $.each(products, function(){
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
            '<td class="user-price">R$ '+this.price+'/h</td>'+
            '<td class="user-hours"><input type="text" class="hours form-control" maxlength="3" value="'+this.hours+'" data-username="'+this.login+'"><button class="update btn btn-info" type="submit" class="btn btn-success">Update</button></td>'+
            '<td class="user-total-price">R$ '+this.total_price+'</td>'+
            '<td class="user-remove" data-username="'+this.login+'"><button type="submit" class="remove-from-cart btn btn-default"><span class="glyphicon glyphicon-remove"></span></button></td>'+
          '</tr>';
        });
        $('#cartbody').html(output); 
        $('#order-total').html(response.cart.order_total);
      }
    });
  }
  
  /**
  * This is a generic function to send AJAX requests to APIs.
  */
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      dataType: "json",
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }

  // Update cart on first run.
  updateCart();
});