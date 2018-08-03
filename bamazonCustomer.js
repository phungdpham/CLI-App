var mysql = require('mysql');
var inquirer = require('inquirer');

//Connecting to MySQL database server
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'forPhung87$',
    database: 'bamazondb'
});

//Creating connection with database
connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("---------------------------------------------------");
    showItemsAvail();
})

//Function that display all the products available for sale

function showItemsAvail() {
    connection.query("SELECT * FROM products", function (err, res) {
        console.log("All available products")
        console.log("---------------------------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ". " + res[i].product_name);
        }
        customerView();
    })
}

//Function that searches products by it
function customerView() {
    inquirer
      .prompt(
      {
          name: "itemId",
          type: "input",
          message: "Search products by entering product Id (from 1 to 10)"
      })
      .then(function(answer) {
          var query = "SELECT item_id, product_name, price FROM products WHERE ?";
          connection.query(query, {item_id: answer.itemId}, function(err, res) {
              for (var i = 0; i < res.length; i++) {
                  console.log("Result");
                  console.log("---------------------------------------------------");
                  console.log("Item Id: " + res[i].item_id);
                  console.log("Product Name: " + res[i].product_name);
                  console.log("Price: $" + res[i].price)
                  console.log("---------------------------------------------------");
                  checkInventory(res[i].item_id);
              }
          })
        })
}
//Function for order details
function checkInventory(itemId) {
    inquirer
      .prompt({
            name: "quantityToBuy",
            type: "input",
            message: "Purchase Quantity: "
        })
        .then(function(answer) {
              var query = "SELECT * FROM products WHERE item_id=?";
              connection.query(query, itemId, function(err, res) {
                  for (var i = 0; i <res.length; i++) {
                      if (res[i].stock_quantity >= answer.quantityToBuy) {
                          console.log("Order detail")
                          console.log("---------------------------------------------------");
                          console.log("Purchase product: " + res[i].product_name);
                          console.log("Purchase quantity: " + res[i].stock_quantity);
                          console.log("Total Price: $" + res[i].price * answer.quantityToBuy);
                          console.log("---------------------------------------------------");
                      }
                      else {
                        console.log("Insufficient quantity!");
                        break;
                    }
                  }
                  connection.end();
              })
        })
}