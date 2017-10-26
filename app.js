const sql = require('./sql.js');
const inquirer = require('inquirer');

main();

function main(){
  sql.grabRows()
    .then((rows) => {
      mainMenu(rows);
    })
    .catch((err) => {
      error(err);
    });
}

function mainMenu(rows){

  let product_names = [];

  rows.forEach((value, index) => {
    product_names.push(rows[index].name + " | $" + rows[index].price + " | Items Left " + rows[index].stock_left + " | ID=" + (index + 1));
  });

  inquirer.prompt([
      {
        type: "list",
        name: "productOption",
        message: "\nWhich product do you want to buy?",
        choices: product_names
      }
      ])
      .then((answer) => {

        let productId = answer.productOption.split('=')[1];
        let name = rows[productId - 1].name;

        inquirer.prompt([
        {
          type: "input",
          name: "quantity",
          message: "\nHow many of " + name + " do you want to buy?"
        }
        ])
        .then((answer) => {
          let quantity = parseInt(answer.quantity);
          let price = quantity * rows[productId -1].price;

          let check = rows[productId -1].stock_left - quantity;

          if ( check >= 0) {
            sql.decreaseQuantity(productId,quantity)
              .then(()=> {
                
                console.log("You bought " + quantity + " of " + name + " for $" + price + " .");
                console.log("Run this program again if you want to buy more products!");
                process.exit();

              })
              .catch((err) => {
                console.error(err);
              });
          }
          else {
            console.log("You cannot purchase " + name + " because there are not enough left.");
            console.log("Run this program again if you want to buy more products!");
            process.exit();
          }

        })
        .catch((err) => {
          error(err);
        });
        
      })
      .catch((err) => {
        error(err);
      });
}



function error(err){
  console.error("Error! " + err);
}
