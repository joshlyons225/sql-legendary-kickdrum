USE staff;

INSERT INTO department (name)
VALUES ('Marketing');
INSERT INTO department (name)
VALUES ('Administration');
INSERT INTO department (name)
VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('BD Consultant', 65000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('BD Manager', 85000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Admin Assistant', 40000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Ops Manager', 95000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Finance Manager', 95000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('VP Operations', 115000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('VP Finance', 115000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Assistant', 45000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('HR Director', 85000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Josh', 'Lyons', 4, NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Keith', 'Richards', 1, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Buddy', 'Guy', 2, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Page', 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Gary', 'Clark Jr', 5, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('David', 'Gilmour', 6, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Stevie', 'Ray Vaughan', 7, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Billy', 'Gibbons', 8, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Slash', 'Rad', 9, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jack', 'White', 10, 2);


