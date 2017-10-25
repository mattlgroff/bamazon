const  mysql = require('mysql2/promise');

module.exports = {
  grabRows: async function() {
    const connection = await mysql.createConnection({
      host:"localhost",
      port: 3306,
      user: "root",
      password: process.env.mysql_pw,
      database: "bamazon_DB"
    });
    // query database
    // const [rows, fields] = await connection.execute('SELECT * FROM `products` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
    const [rows, fields] =  await connection.execute('SELECT * FROM `products`');

    connection.end();
    return rows;
  },
  display: function(rows){
    rows.forEach((value, index) => {
      console.log("----------");
      console.log("Product Name: " + rows[index].name);
      console.log("Price: " + rows[index].price);
      console.log("Stock Left: " + rows[index].stock_left);
      console.log("Product ID: " + rows[index].id);
    });
    console.log("");
  },
  displayRows: function(){
    this.grabRows().then((rows) => {
      this.display(rows);
    }).catch((err) => {
      console.log("Error!");
    });
  },
  //'UPDATE `products` SET `items_left` = `items_left` - 1 WHERE `id` = ?'
  decreaseQuantity: async function(id) {
    const connection = await mysql.createConnection({
      host:"localhost",
      port: 3306,
      user: "root",
      password: process.env.mysql_pw,
      database: "bamazon_DB"
    });
    // query database
    // const [rows, fields] = await connection.execute('SELECT * FROM `products` WHERE `name` = ? AND `age` > ?', ['Morty', 14]);
    const [rows, fields] =  await connection.execute('UPDATE `products` SET `stock_left` = `stock_left` - 1 WHERE `id` = ?', [id]);

    connection.end();
    return rows;
  },
}

