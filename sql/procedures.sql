USE event_planner;

DELIMITER //

-- create event

CREATE PROCEDURE create_event(
  IN event_name VARCHAR(50),
  IN date_start DATETIME,
  IN date_end DATETIME,
  IN maximum_attendees INT,
  IN event_location VARCHAR(250)
)
BEGIN
  INSERT INTO event (
    event_name, 
    date_start, 
    date_end, 
    maximum_attendees, 
    event_location
  ) 
  VALUES (
    event_name, 
    date_start, 
    date_end, 
    maximum_attendees, 
    event_location);
END //

-- create register_person

CREATE PROCEDURE register_person(
    IN event_id INT,
    IN first_name VARCHAR(50),
    IN last_name VARCHAR(50),
    IN date_register DATETIME 
)

BEGIN
  DECLARE count_person INT;
  DECLARE max_capacity INT;

  SELECT COUNT(*) INTO count_person FROM register WHERE event_id = event_id;
  SELECT maximum_attendees INTO max_capacity FROM event WHERE id = event_id;

  IF count_person < max_capacity THEN
    INSERT INTO register (event_id, first_name, last_name, date_register)
    VALUES (event_id, first_name, last_name, date_register);
  ELSE SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT ='Error : max capacity reached';
    END IF;
END //

DELIMITER ;