
select e.id AS Employee_Id, CONCAT(e.first_name, " ",e.last_name) AS Employee, r.title AS Role,
d.name AS Department, r.salary as Salary, CONCAT(emp.first_name, " ",emp.last_name) AS Manager
FROM employee e
LEFT JOIN employee emp ON e.manager_id = emp.id
JOIN roles r ON e.role_id = r.id
JOIN department d ON r.dept_id = d.id;
--WHERE e.manager_id(LEFT) = emp.id,
--AND e.role_id = r.id,
--AND r.dept_id = d.id;