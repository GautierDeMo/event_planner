import { mysqlClient } from "./main.js";

export async function createEvent(mappedJsonEvent) {
  await mysqlClient.query('CALL create_event(?, ?, ?, ?, ?)', [
    mappedJsonEvent.eventName,
    mappedJsonEvent.dateStart,
    mappedJsonEvent.dateEnd,
    mappedJsonEvent.maximumAttendees,
    mappedJsonEvent.eventLocation,
  ]);
}

export async function registerPerson(mappedJsonAttendee) {
  const [result] = await mysqlClient.query('SELECT LAST_INSERT_ID() as id');
  const eventId = result[0].id;
  mappedJsonAttendee.map( async (attendee) => {
    await mysqlClient.query('CALL register_person(?, ?, ?, ?)', [
      eventId,
      attendee.firstName,
      attendee.lastName,
      attendee.dateRegister,
    ]);
  })

}
