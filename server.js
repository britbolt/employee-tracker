const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');



  // Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startPrompts();
  });


   
  function startPrompts() {
    inquirer.prompt ([
        {
            type:"list",
            message: "What would you like to do?",
            name: "start",
            choices: [
                "Add employee",
                "View all employees",
                "delete employee",
                "add department",
                "view all departments",
                "add role",
                "view all roles",
                "update employee role",
                "exit"
            ]
        }
    ])
    .then (function(res){
        switch (res.start){
            case "add employee":
                addEmployee();
                break;

                case "View all Employees":
                viewAllEmployees();
                break; 
              
                case "Remove Employee": 
                removeEmployee(); 
                break;
                  
                case "Add Department": 
                addDept(); 
                break;
              
                case "View all Departments":
                viewAllDept();
                break;
              
                case "Add Roles": 
                addRole(); 
                break;
              
                case "View all Roles": 
                viewAllRoles(); 
                break;
                  
                case "Update Employee Role":
                updateEmployeeRole(); 
                break;
              
                case "Exit":
                connection.end(); 
                break; 
            }
         })
     };

// Get all employees and their roles
function viewAllEmployees() {
      const sql = `SELECT employees.*, roles.title
                    AS role_title 
                    FROM employees
                    LEFT JOIN roles 
                    ON employees.role_id = roles.id`;
    
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
       console.log("employee list");
       cTable(rows);
       startPrompts();
      });
    };

    function viewAllDept() {
      const sql = `SELECT departments.id 
                    AS ID,
                    departments.name AS Department FROM departments`;
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
       console.log("department list");
       cTable(rows);
       startPrompts();
      });
    };

    // view all roles
    function viewAllRoles() {
      const sql = `SELECT * FROM roles`;
      db.query(sql, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
       console.log("Roles list");
       cTable(rows);
       startPrompts();
      });
    };

  // Add an employee to the db
function addEmployee() {
    console.log('adding a new employee');
    inquirer.prompt([
        {
            type:"input",
            message: "first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "last name?",
            input: "last_name",
        },
        {
            type: "list",
            message: "what is the employees role?",
            name: "role_id",
            choices: [1,2,3],
        },
        {
            type: "list",
            message: "who is their manager?",
            name: "manager_id",
            choices: [1,2,3],
        }
    ])
    .then (function(res){
      const errors = inputCheck(
        body,
        'first_name',
        'last_name',
        'role_id',
        'manager_id'
      );
        db.query(
            "INSERT INTO employees SET ?",
            {firstName: res.first_name,
            lastName: res.last_name,
            managerID: manager_id,
            roleId: role_id},
            
            function(err) {
             if(err) throw err;
             console.log("employee added successfully!"); 
                
             startPrompts();
            }
        );
    })
}
  
  
    