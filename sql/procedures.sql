USE event_planner;

DELIMITER //

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

DELIMITER ;