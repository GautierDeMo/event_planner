DROP USER IF EXISTS 'user1'@'localhost';
CREATE USER 'user1'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT ON *.* TO `user1`@`localhost`;
GRANT EXECUTE ON `event_planner`.* TO `user1`@`localhost`;
FLUSH PRIVILEGES;
