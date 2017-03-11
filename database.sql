CREATE TABLE employees(
id SERIAL PRIMARY KEY,
first_name VARCHAR(40),
last_name VARCHAR(40),
employee_number INT,
job_title VARCHAR(80),
salary NUMERIC(14,2),
active BOOLEAN DEFAULT TRUE);

CREATE TABLE budget(
id SERIAL PRIMARY KEY,
budget_limit NUMERIC(16,2));

-- filler data

INSERT INTO employees
(first_name, last_name, employee_number, job_title, salary)
VALUES ('Banana', 'Jones', 100, 'Operator', 33333.33),
('Mel', 'Orange', 101, 'Multiplier', 12345.67),
('Avocado', 'Smith', 102, 'Descendant', 24000);

INSERT INTO budget
(budget_limit)
VALUES (120000);
