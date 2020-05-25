//psuedocode:
//add____ function
//view ____ function
//update employee roles function

//const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./connection");

function start(){
    inquirer.prompt({
        name: "addViewUpdate",
        type: "list",
        message: "Would you like to Add or View depts, roles, or employees? Or update an employee's role?",
        choices: ["ADD", "VIEW", "UPDATE", "EXIT"]
    }).then(answer => {
        if(answer.addViewUpdate === "ADD") console.log("choice is ADD");
        else if(answer.addViewUpdate === "VIEW") console.log("choice is VIEW");
        else if(answer.addViewUpdate === "UPDATE") console.log("choice is UPDATE");
        else connection.end();
    });
}

// function addDept(){
//     inquirer.prompt({
//         name: "newDept",
//         type: "input",
//         message: "What department would you like to add?"
//     }).then(answer => {
//         connection.query("INSERT")
//     })
// }
//  start();