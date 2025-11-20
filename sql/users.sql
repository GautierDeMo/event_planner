DROP USER IF EXISTS 'admin'@'localhost';
CREATE USER 'admin'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT ON *.* TO `admin`@`localhost`;
GRANT EXECUTE ON `event_planner`.* TO `admin`@`localhost`;
FLUSH PRIVILEGES;
