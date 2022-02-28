
const db = require('./db/connection');
const inquirer = require('inquirer');




const startPrompts = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'userAction',
            message: 'Welcome to the Employee Management System. What would you like to do?'
        }
    ])
}