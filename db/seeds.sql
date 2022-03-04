
INSERT INTO department (name)
VALUE ("Engineering");

INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO department (name)
VALUE ("Finance");

INSERT INTO department (name)
VALUE ("Sales");


INSERT INTO roles (title, salary, dept_id)
VALUE ("SW Engineer l", 75000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUE ("SW Engineer ll", 95000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUE ("SW Engineer lll", 120000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUE ("SW Engineer lV", 147000, 1);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Sr. Corporate Lawyer", 200000, 2);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Corporate Lawyer", 150000, 2);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Corporate Lawyer Assistant", 95000, 2);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Sr. Accountant", 110000, 3);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Accountant", 90000, 3);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Budget Analyst", 80000, 3);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Risk Analyst", 80000, 3);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Sales Analyst", 80000, 4);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Maketing Analyst", 80000, 4);

INSERT INTO roles (title, salary, dept_id)
VALUE ("Account POC", 95000, 4);


INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kerry", "Long", null, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Donice", "Scott", 1, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brian", "Meadows", null, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Taylor", "Bryant", null, 8);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Angel", "Gonzalez", 3, 6);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sofia", "Trejo", 4, 10);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Linda", "Williams", null, 10);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Deontez", "Lyons", 7, 9); 
