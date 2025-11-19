USE event_planner;

DELIMITER //

-- create event

CREATE PROCEDURE create_event(
  IN p_event_name VARCHAR(50),
  IN p_date_start DATETIME,
  IN p_date_end DATETIME,
  IN p_maximum_attendees INT,
  IN p_event_location VARCHAR(250)
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
    p_event_name,
    p_date_start,
    p_date_end,
    p_maximum_attendees,
    p_event_location);
END //

-- create register_person

CREATE PROCEDURE register_person(
    IN p_event_id INT,
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_date_register DATETIME
)

BEGIN
  DECLARE count_person INT;
  DECLARE max_capacity INT;

  SELECT COUNT(*) INTO count_person FROM register WHERE event_id = p_event_id;
  SELECT maximum_attendees INTO max_capacity FROM event WHERE id = p_event_id;

  IF count_person < max_capacity THEN
    INSERT INTO register (event_id, first_name, last_name, date_register)
    VALUES (p_event_id, p_first_name, p_last_name, p_date_register);
  ELSE SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT ='Error : max capacity reached';
    END IF;
END //

-- unregister_person

CREATE PROCEDURE unregister_person (
    IN p_event_id INT,
    IN p_first_name VARCHAR (50),
    IN p_last_name VARCHAR (50)
)

BEGIN
DELETE FROM register
WHERE event_id = p_event_id
  AND first_name = p_first_name
  AND last_name = p_last_name;
END //

DELIMITER ;