const express = require('express');
const inquirer = require('inquirer');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

  // Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });


  // Get all employees and their roles
const viewAllEmployees = () => {
    router.get('/employees', (req, res) => {
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
          res.json({
            message: 'success',
            data: rows
          });
        });
      });
    }

    
  function start() {
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
        const query = connection.query(
            "INSERT INTO employees SET ?",
            res,
            function(err, res) {
             if(err) throw err;
             console.log("employee added successfully!");    
             start();
            }
        );
    })
}
function viewAllEmployees() {

    connection.query("SELECT * FROM employees",
    function(err, res) {
      if (err) throw err;
      cTable(res);
      start();
    });
  }
    