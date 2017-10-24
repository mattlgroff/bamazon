const sql = require('./sql.js');
const inquirer = require('inquirer');

sql.grabRows()
  .then((rows) => {
    mainMenu(rows);
  })
  .catch((err) => {
    error(err);
  });

function mainMenu(rows){

  let product_names = [];

  rows.forEach((value, index) => {
    product_names.push(rows[index].name + " | $" + rows[index].price + " | Items Left " + rows[index].stock_left);
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
        console.log(answer.productOption);
      })
      .catch((err) => {
        error(err);
      });
}

function error(err){
  console.error("Error! " + err);
}
