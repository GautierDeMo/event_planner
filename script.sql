DROP DATABASE IF EXISTS event_planner;
CREATE DATABASE IF NOT EXISTS event_planner ;
USE event_planner;
CREATE TABLE IF NOT EXISTS event
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(50) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    date_start DATETIME NOT NULL,
    date_end DATETIME NOT NULL,
    maximum_attendees INT,
    event_location VARCHAR(250) NOT NULL
  )
;
CREATE TABLE IF NOT EXISTS register
  (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_register DATETIME,
    FOREIGN KEY(event_id) REFERENCES event(id)
  )
;
