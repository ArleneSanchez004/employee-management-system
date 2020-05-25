const inquirer = require("inquirer");
const connection = require("./connection");
require("console.table");

function start(){
    inquirer.prompt({
        name: "viewAddUpdate",
        type: "list",
        message: "Would you like to VIEW or ADD depts, roles, or employees? Or UPDATE an employee's role or manager?",
        choices: [
            "VIEW Departments",
            "VIEW Roles",
            "VIEW Employees",
            "VIEW Employees by Role",
            "VIEW Employees by Department",
            "ADD Department",
            "ADD Role",
            "ADD Employee", 
            "UPDATE Employee Role",
            "UPDATE Employee Manager",
            "EXIT"]
    }).then(answer => {
        if(answer.viewAddUpdate === "VIEW Departments") {
            viewDept();
        }else if(answer.viewAddUpdate === "ADD") {
            console.log("choice is ADD");
            //addDept();
        }else if(answer.viewAddUpdate === "UPDATE") {
            console.log("choice is UPDATE");

        }else connection.end();
    });
}

function viewDept(){
     connection.query("SELECT id, name FROM department", (err, result) => {
         if (err) throw err;
         console.table(result);
         start();
     });
    };


// function addDept(){
//     inquirer.prompt({
//         name: "newDept",
//         type: "input",
//         message: "What department would you like to add?"
//     }).then(answer => {
//         connection.query("INSERT INTO department (name) SET ?", (answer.newDept));
//         console.log(answer.newDept);
//     });
// }
 start();