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
        }else if(answer.viewAddUpdate === "ADD Employee") {
            addEmployee();
        }else if(answer.viewAddUpdate === "UPDATE Employee Role") {
            updateEmployeeRole();
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
    connection.query("SELECT * FROM employee", (err, result) => {
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

function addRole(){
    inquirer.prompt([
        {
            name: "roleTitle",
            type: "input",
            message: "What Role would you like to add?"
        },
        {
           name: "roleSalary",
           type: "input",
           message: "What is this position's salary?"
        },
        {
            name: "roleDepartmentId",
            type: "input",
            message: "What is the DepartmentId?"
        }
    ]).then(answer => {
        connection.query("INSERT INTO role SET ?", { title: answer.roleTitle, salary: answer.roleSalary, department_id: answer.roleDepartmentId }, (err, result) =>{
            if (err) throw err;
            console.log(`Successfully added ${answer.roleTitle} to Roles.`);
            start();
        });
    });
};

function addEmployee(){
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name?"
        },
        {
           name: "lastName",
           type: "input",
           message: "What is the last name?"
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the role ID?"
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the manager ID?",
            default: "null"
        }
    ]).then(answer => {
        connection.query("INSERT INTO employee SET ?", { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleId, manager_id: answer.managerId }, (err, result) =>{
            if (err) throw err;
            console.log(`Successfully added ${answer.firstName} ${answer.lastName} to Employees.`);
            start();
        });
    });
}

function updateEmployeeRole(){
    connection.query("SELECT first_name, last_name FROM employee", (err, result) => {
        if (err) throw err;
        let roleTitles = [];
        let namesArray = [];
        for(i=0; i < result.length ; i++){
            let first = result[i].first_name;
            let last = result[i].last_name;
            //console.log(first + " " + last);
            namesArray.push(first + " " + last);
        }
        connection.query("SELECT title FROM role", (err, result2) => {
            if (err) throw err;
            for(j=0; j < result2.length ; j++){
                roleTitles.push(result2[j].title);
                //console.log(roleTitles);
            }
            inquirer.prompt([
                {
                    name: "employeeChoice",
                    type: "list",
                    message: "Which Employee would you like to update?",
                    choices: namesArray
                },
                {
                   name: "roleChoice",
                   type: "list",
                   message: "Which role would you like the Employee to have?",
                   choices: roleTitles 
                }
            ]).then(function(employeeChoice, roleChoice, err){
                if (err) throw err;
                //console.log(employeeChoice.employeeChoice);
                //console.log(employeeChoice.roleChoice);
                
                connection.query("SELECT id FROM role WHERE title = ?", [employeeChoice.roleChoice], (err, result3) => {
                    if (err) throw err;
                    let roleId = result3[0].id;
                    let name = employeeChoice.employeeChoice.split(" ");
                    connection.query("UPDATE employee SET role_id = ? WHERE first_name = ? and last_name = ?", [roleId, name[0], name[1]], (err, res) => {
                        if(err) throw err;
                        console.log(`${employeeChoice.employeeChoice} has been successfully updated to ${employeeChoice.roleChoice}`);
                        start();
                    })
                }); 
            });
        });
    });
};


 start();