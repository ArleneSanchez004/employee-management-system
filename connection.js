const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeDB"
});

connection.connect( () => {
    console.log("you are connected, listening on " + connection.threadId);
    //afterConnection();
});

// function afterConnection() {
//     connection.query("SELECT * FROM department", (err, res) => {
//         if (err) throw err;
//         console.log(res);
//         connection.end();
//     });
// };

module.exports = connection;