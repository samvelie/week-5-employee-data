CREATE TABLE employees(
id SERIAL PRIMARY KEY,
name VARCHAR(80),
salary NUMERIC(14,2),
active BOOLEAN);

CREATE TABLE budget(
id SERIAL PRIMARY KEY,
budget_limit NUMERIC(16,2));

-- filler data

INSERT INTO employees
(name, salary, active)
VALUES ('Banana Jones', 33333.33, 'TRUE'),
('Avocado Smith', 12345.67, 'TRUE'),
('Mel Orange', 24000, 'TRUE');

INSERT INTO budget
(budget_limit)
VALUES (120000);
