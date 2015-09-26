

$(function(){


  $('#get_users').on('click', function(e){
    e.preventDefault();

    var org_name = $('#orgname').val();
    var org_uri   = 'https://api.github.com/orgs/'+org_name;
    var org_members_uri   = 'https://api.github.com/orgs/'+org_name+'/members';
    var output = "";

    $('#userslist').html('<div style="text-align:center"><img src="http://3.bp.blogspot.com/-FjddXJJsIv8/VeaoXmv8HQI/AAAAAAAAGww/PlCl0uSR_9g/s1600/loading.gif"></div>');
    if(org_name != ''){
      requestJSON(org_members_uri, function(org_members_json) {
        if(org_members_json.message == "Not Found") {
          $('#userslist').html("<div class='alert alert-danger'>Sorry, we didn't find '"+org_name+"' in GitHub</div>");
        } 
        else {
          requestJSON(org_uri, function(org_json){
            if (org_json.blog != "") { blog = 'Website <a href="'+org_json.blog+'">'+org_json.blog+'</a>'; }
            $('#organization').html(
              '<div class="col-sm-12 wrapper">'+
              '<img width="70px" src="'+org_json.avatar_url+'">'+
              '<div class="org-info"><h3>'+org_json.name+'</h3>'+
              'GitHub <a href="'+org_json.html_url+'">'+org_json.html_url+'</a><br>'+
              blog+'</div></div>'
              );
          });
          
          requestJSON("api/users.php?org="+org_name, function(details) {
            $.each(details, function(){
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
          });
        } 
      });
    } else {
      $('#userslist').html("<div class='alert alert-danger'>Nothing to search...</div>");
    }
  });

  $('body').on('click', '.add-to-cart', function(e){
    e.preventDefault();
    addToCart($(this).parent().data("username"), $(this).parent().data("price"));
  });

  $('body').on('click', '.remove-from-cart', function(e){
    e.preventDefault();
    console.log("Clicked");
    removeFromCart($(this).parent().data("username"));
  });

  $('body').on('click', '.update', function(e){
    e.preventDefault();
    updateTotal($(this).prev().data("username"), $(this).prev().val());
  });

  /**
  * This function adds a developer to the cart.
  * Through an AJAX request, it sends a JSON string to the server and, 
  * if the process is successful, returns a message to the client.
  */
  function addToCart(username, price) {
      $.ajax({
        type: "GET",
        url: "api/cart.php?action=add&username="+username+"&price="+price,
        success: function(result){
          updateCart();
        }
      });
  }

  function removeFromCart(username){
    $.ajax({
        type: "GET",
        url: "api/cart.php?action=remove&username="+username,
        dataType: "json",
        success: function(result){
          updateCart();
        }
      });
  }

  function updateTotal(username, hours){
    $.ajax({
      type: "GET",
      url: "api/cart.php?action=update&username="+username+"&hours="+hours,
      dataType: "json",
      success: function(result){
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
          if(result.message == "Your cart is empty.") {
            $('#cartbody').html("Your cart is empty."); 
            $('#order-total').html("0,00");
          } else {
            var products = result.cart.products;
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
                '<td class="user-remove" data-username="'+this.login+'"><button type="submit" class="remove-from-cart btn btn-danger">Remove from cart</button></td>'+
              '</tr>';
            });
            $('#cartbody').html(output); 
            $('#order-total').html(result.cart.order_total);
          }
          
        }
      });
  }
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      dataType: "json",
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }

  updateCart();
});