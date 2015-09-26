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
          <a class="navbar-brand" href="index.html">devshop</a>
        </div>
      </div>
    </nav>

    <section>
      <div class="container">
        <div class="checkout row">
          <div class="col-sm-4">
            <div class="thanks">
              <h2>Thanks for buying with us!</h2>
              <a href="index.php"><< Continue shopping</a>
            </div>
          </div>
          <div class="users-list col-sm-8">
            <h3>Order summary</h3>
            <table class="table">
            <thead>
              <th></th>
              <th>Price x hours</th>
              <th>Total amount</th>
            </thead>
            <tbody id="checkoutbody"></tbody>
            <tr>
              <td></td>
              <td class="text-center"><b>Order total</b></td>
              <td class="text-center"><b>R$ <span id="checkout-order-total">0,00</span></b></td>
            </tr>
          </table>
          </div>
        </div>
      </div>
    </div>

    
    

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="lib/jquery/jquery-1.11.2.min.js"><\/script>')</script>

    <script src="lib/bootstrap/bootstrap.js"></script>
    <script src="script/main.js"></script>
    <script type="text/javascript" src="script/get_users.js"></script>
    <script type="text/javascript">
    </script>
  </body>
</html>
