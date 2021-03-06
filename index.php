<!doctype html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Coding Challenge VTEX</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="lib/bootstrap/bootstrap.css">
    <link rel="stylesheet" href="style/main.css">
  </head>

  <body>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="index.php">devshop</a>
        </div>
      </div>
    </nav>
    
    <section class="search-area">
      <div class="container">
        <div class="search row">
            <h2>Enter a GitHub organization to find developers</h2>
            <form class="form-inline" role="form">
              <div class="form-group">
                <input id="orgname" type="text" placeholder="GitHub Organization" class="search-box form-control">
              </div>
              <button type="submit" id="get_users" class="btn btn-success">Search</button>
            </form>
        </div>

        <div id="searchresult" class="search-result row">
          <div id="organization" class="org" ></div>
          <div id="userslist"></div>
        </div>
      </div>
    </section>

    <section class="cart-area">
      <div class="container">
        <div class="cart row">
          <h2>Cart</h2>
          <table  class="table">
            <thead>
              <th></th>
              <th>Price per hour</th>
              <th># of hours</th>
              <th>Total amount</th>
              <th></th>
            </thead>
            <tbody id="cartbody"></tbody>
          </table>
        </div>

        <div class="totalizer row ">
          <div class="col-sm-3 pull-right">
            <div class="row">
              <div class="order-total">
                <span>Order total: R$ </span>
                <span id="order-total">0,00</span>
              </div>
              <hr>
              <div class="checkout">
                <a href="checkout.php" class="btn btn-primary">Proceed to checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div> <!-- /container -->
    </section>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="lib/jquery/jquery-1.11.2.min.js"><\/script>')</script>

    <script src="lib/bootstrap/bootstrap.js"></script>
    <script src="script/main.js"></script>
    <script type="text/javascript">
      
    </script>
  </body>
</html>
