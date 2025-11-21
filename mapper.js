// #region Disisfine mapping
function _mapDisisfineEvent(data) {
  return {
    eventName: data.e_name,
    dateStart: data.e_start,
    dateEnd: data.e_finish,
    maximumAttendees: data.e_attendees_max,
    eventLocation: data.e_location,
  };
}

function _mapDisisfineAttendees(data) {
  return data.attendees.map(([firstName, lastName, dateRegister]) => ({
    firstName: firstName,
    lastName: lastName,
    dateRegister: dateRegister,
  }));
}
// #endregion

// #region Truegister mapping
function _mapTruegisterEvent(data) {
  const eventData = data.results[0].event;
  return {
    eventName: eventData.event_name,
    dateStart: eventData.event_begin,
    dateEnd: eventData.event_finish,
    maximumAttendees: null,
    eventLocation: eventData.event_where,
  };
}

function _mapTruegisterAttendees(data) {
  const attendees = data.results[0].attendees;

  return attendees.map((attendee) => ({
    firstName: attendee.attendee_1,
    lastName: attendee.attendee_2,
    dateRegister: null,
  }));
}
// #endregion

// #region Liveticket mapping
function _mapLiveticketEvent(data) {
  return {
    eventName: data.event,
    dateStart: data.start,
    dateEnd: data.end,
    maximumAttendees: data.max,
    eventLocation: data.where,
  };
}

function _mapLiveticketAttendees(data) {
  return data.attendees.map((attendee) => ({
    firstName: attendee.fn,
    lastName: attendee.ln,
    dateRegister: attendee.when,
  }));
}
// #endregion

// #region data mapping by import type (disisfine, truegister or liveticket)
export function mapEvent(importType, data) {
  switch (importType) {
    case "disisfine":
      return _mapDisisfineEvent(data);
    case "truegister":
      return _mapTruegisterEvent(data);
    case "liveticket":
      return _mapLiveticketEvent(data);
    default:
      throw new Error(`Type d'import inconnu: ${importType}`);
  }
}

export function mapAttendees(importType, data) {
  switch (importType) {
    case "disisfine":
      return _mapDisisfineAttendees(data);
    case "truegister":
      return _mapTruegisterAttendees(data);
    case "liveticket":
      return _mapLiveticketAttendees(data);
    default:
      throw new Error(`Type d'import inconnu: ${importType}`);
  }
}
// #endregion
