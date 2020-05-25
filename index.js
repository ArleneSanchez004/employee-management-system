const inquirer = require("inquirer");
const connection = require("./connection");
require("console.table");

function start(){
    inquirer.prompt({
        name: "viewAddUpdate",
        type: "list",
        message: "What would you like to do?",
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
        }else if(answer.viewAddUpdate === "VIEW Roles") {
            viewRoles();
        }else if(answer.viewAddUpdate === "VIEW Employees") {
            viewEmployees();
        }else if(answer.viewAddUpdate === "VIEW Employees by Role") {
            viewEmployeesByRole();
        }else if(answer.viewAddUpdate === "VIEW Employees by Department") {
            viewEmployeesByDepartment();
        }else if(answer.viewAddUpdate === "ADD Department") {
            addDepartment();
        }else if(answer.viewAddUpdate === "ADD Role") {
            addRole();
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

function viewRoles(){
    connection.query("SELECT id, title, department_id FROM role", (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

function viewEmployees(){
    connection.query("SELECT first_name, last_name FROM employee", (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

function viewEmployeesByRole(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id", (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

function viewEmployeesByDepartment(){
    connection.query("SELECT employee.first_name, employee.last_name, department.name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", (err, result) => {
        if (err) throw err;
        console.table(result);
        start();
    });
};

function addDepartment(){
    inquirer.prompt({
        name: "addDept",
        type: "input",
        message: "What department would you like to add?"
    }).then(answer => {
        connection.query("INSERT INTO department SET ?", { name: answer.addDept }, (err, result) =>{
            if (err) throw err;
            console.log(`Successfully added ${answer.addDept} to Departments.`);
            start();
        });
    });
};


 start();