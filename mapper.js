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

function _mapDisisfineAttendees(eventId, data) {

	return data.attendees.map(([firstName, lastName, dateRegister]) => ({
		eventId: eventId,
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

function _mapTruegisterAttendees(eventId, data) {
	const attendees = data.results[0].attendees;

	return attendees.map((attendee) => ({
		eventId: eventId,
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

function _mapLiveticketAttendees(eventId, data) {
	return data.attendees.map((attendee) => ({
		eventId: eventId,
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

export function mapAttendees(importType, eventId, data) {
	switch (importType) {
		case "disisfine":
			return _mapDisisfineAttendees(eventId, data);
		case "truegister":
			return _mapTruegisterAttendees(eventId, data);
		case "liveticket":
			return _mapLiveticketAttendees(eventId, data);
		default:
			throw new Error(`Type d'import inconnu: ${importType}`);
	}
}
// #endregion
