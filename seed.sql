USE employeeDB;

INSERT INTO department (name)
VALUES ("Production"), ("Sales"), ("Distribution");

INSERT INTO role (title, salary, department_id)
VALUES 
    ("Production Manager", 40000, 1),
    ("Production Worker", 30000, 1),
    ("Sales Manager", 50000, 2),
    ("Sales Rep", 45000, 2),
    ("Distribution Manager", 40000, 3),
    ("Driver", 30000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Eva", "San", 1, null),
    ("Jon", "Par", 2, 1),
    ("Jorge", "Her", 3, null),
    ("Arlene", "San", 4, 3),
    ("Mila", "Sof", 5, null),
    ("Cindy", "Gis", 6, 5);
