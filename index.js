
const db = require('./db/connection');
const inquirer = require('inquirer');

db.connect(err => {
    if (err) throw err;
    //console.log('Database connected.');
});


var departments = [];
const getDepartments = () => {
    const sql = `SELECT name FROM department;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        for (var i = 0; i < rows.length; i++) {
            departments.push(rows[i].name);
        }

    });
    return departments;
}

var roles = [];
const getRoles = () => {
    const sql = `SELECT title FROM roles;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        for (var i = 0; i < rows.length; i++) {
            roles.push(rows[i].title);
        }

    });
    return roles;
};

var managers = [];
const getManagers = () => {
    const sql = `SELECT CONCAT(first_name,'-',last_name) AS Name FROM employee WHERE manager_id IS NULL;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        for (var i = 0; i < rows.length; i++) {
            managers.push(rows[i].Name);
        }

    });
    return managers;
};

var employees = [];
const getEmployees = () => {
    const sql = `SELECT CONCAT(first_name,'-',last_name) AS Name FROM employee;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        for (var i = 0; i < rows.length; i++) {
            employees.push(rows[i].Name);
        }

    });
    console.table(employees);
    return employees;
};

const addEmployee = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee.'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the employee.'
        },
        {
            type: 'list',
            name: 'empRole',
            message: 'Choose a role for the employee',
            choices: getRoles()
        },
        {
            type: 'list',
            name: 'empMgr',
            message: 'Choose a manager for the employee',
            choices: getManagers()
        }
    ])
        .then(empData => {
            let sql = `SELECT id FROM roles WHERE title = ?;`
            let parms = [empData.empRole];

            db.query(sql, parms, (err, row) => {
                if (err) {
                    throw err;
                }

                //console.table(row);
                let sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id)
            SELECT '${empData.firstName}', '${empData.lastName}', '${row[0].id}', id
            FROM employee WHERE CONCAT(first_name,'-',last_name) = ?;`

                let parms = [empData.empMgr];

                db.query(sql, parms, (err, result) => {
                    if (err) {
                        throw err;
                    }
                    viewAllEmployees();
                })


            });

        });

};

const addRole = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter the name of the role'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter a salary for the role'
        },
        {
            type: 'list',
            name: 'deptName',
            message: 'Choose a department for the role',
            choices: getDepartments()
        }

    ])
        .then(roleData => {

            let sql = `INSERT INTO roles (title,salary,dept_id)
            SELECT '${roleData.roleName}', '${roleData.salary}', id 
            FROM department WHERE name = ?`;
            let parms = [roleData.deptName];

            db.query(sql, parms, (err, result) => {
                if (err) {
                    throw err;
                }

            });
        })
        .then(result => {
            viewAllRoles();
        })

}


const viewAllDepartments = () => {

    const sql = `SELECT * from department;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        console.log('\r\n');
        userPrompts();

    });
};

const viewAllRoles = () => {

    const sql = `SELECT * from roles;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        console.log('\r\n');
        userPrompts();

    });
};

const viewAllEmployees = () => {

    const sql = `SELECT * from employee;`

    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        }
        console.table(rows);
        console.log('\r\n');
        userPrompts();

    });
};



const addDepartment = () => {

    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Enter the name of the department'
        }

    ])
        .then(deptPrompt => {
            let sql = `INSERT INTO department (name) VALUES(?)`;
            let parms = [deptPrompt.deptName];

            db.query(sql, parms, (err, result) => {
                if (err) {
                    throw err;
                }

            });
        })
        .then(result => {
            viewAllDepartments();
        })

};

const updateEmployeeRole = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'empName',
            message: 'Choose the employee to update',
            choices: getEmployees()
        },
        {
            type: 'list',
            name: 'empRole',
            message: 'Choose the new role for the employee',
            choices: getRoles()
        }
        
    ])
    .then(empData => {

        let sql = `SELECT id FROM roles WHERE title = ?;`
        let parms = [empData.empRole];
        db.query(sql, parms, (err, row) => {
            if (err) {
                throw err;
            }

            let sql = `UPDATE employee SET role_id = ? 
            WHERE CONCAT(first_name,'-',last_name) = ?;`
            let parms = [row[0].id, empData.empName];
            db.query(sql, parms, (err, result) => {
                if (err) {
                    throw err;
                }
                viewAllEmployees();
            });


        });

    })
}
const userPrompts = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'userAction',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit']
        }
    ])
        .then(userChoice => {

            if (userChoice.userAction === "View All Departments") {
                viewAllDepartments();
            }
            else if (userChoice.userAction === "View All Roles") {
                viewAllRoles();
            }
            else if (userChoice.userAction === "View All Employees") {
                viewAllEmployees();
            }
            else if (userChoice.userAction === "Add a Department") {
                addDepartment();
            }
            else if (userChoice.userAction === "Add a Role") {
                addRole();
            }
            else if (userChoice.userAction === "Add an Employee") {
                addEmployee();
            }
            else if (userChoice.userAction === "Update an Employee Role") {
                updateEmployeeRole();
            }
            else {
                console.log("\r\n\r\n Exiting Employee Management System");
                db.close();

            }

            /*
            switch (userChoice.userAction) {
                case "View All Departments":
                    viewAllDepartments();
                    break;

                case "View All Roles":
                    viewAllRoles();
                    break;

                case "Add a Department":
                    addDepartment();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add an Employee":
                    addEmployee();
                    break;

                case "Update an Employee Role":
                    updateEmployeeRole();
                    break;

                default:
                    console.log("\r\n\r\n Exiting Employee Management System");


            }
            */
        })

};

console.log(`
=========================================
Welcome to the Employee Management System
=========================================`);
console.log('\r\n');
userPrompts();
