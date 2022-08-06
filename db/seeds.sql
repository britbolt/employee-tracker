INSERT INTO departments
(dept_name)
VALUES
('sales'),
('engineering'),
('legal');

INSERT INTO roles
(title, salary, department_id)
VALUES
('salesperson', '75000', 1),
('engineer', '85000', 2),
('lawyer', '95000', 3);

INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Alex', 'Mack', 2, NULL),
('Rayna', 'Smith', 1, NULL),
('Jane', 'Williams',3, 10),
('Victor', 'Krum', 1, 2),
('George', 'Fox', 3, 10),
('Brad', 'Thompson', 2, NULL),
('Chris', 'Veesa', 1, 4),
('Chaz', 'Potter', 2, 1),
('Edward', 'Cullen', 1, 2),
('Anderson', 'Cooper', 3, NULL);
