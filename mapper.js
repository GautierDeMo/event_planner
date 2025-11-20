import disisfineData from "./data/disisfine.json" with { type: "json" };
import truegisterData from "./data/truegister.json" with { type: "json" };
import liveticketData from "./data/liveticket.json" with { type: "json" };

// #region Disisfine mapping
function _mapDisisfineEvent() {
	return {
		eventName: disisfineData.e_name,
		dateStart: disisfineData.e_start,
		dateEnd: disisfineData.e_finish,
		maximumAttendees: disisfineData.e_attendees_max,
		eventLocation: disisfineData.e_location,
	};
}

function _mapDisisfineAttendees(eventId) {

	return disisfineData.attendees.map(([firstName, lastName, dateRegister]) => ({
		eventId: eventId,
		firstName: firstName,
		lastName: lastName,
		dateRegister: dateRegister,
	}));
}
// #endregion

// #region Truegister mapping
function _mapTruegisterEvent() {
	const eventData = truegisterData.results[0].event;
	return {
		eventName: eventData.event_name,
		dateStart: eventData.event_begin,
		dateEnd: eventData.event_finish,
		maximumAttendees: null,
		eventLocation: eventData.event_where,
	};
}

function _mapTruegisterAttendees(eventId) {
	const attendees = truegisterData.results[0].attendees;

	return attendees.map((attendee) => ({
		eventId: eventId,
		firstName: attendee.attendee_1,
		lastName: attendee.attendee_2,
		dateRegister: null,
	}));
}
// #endregion

// #region Liveticket mapping
function _mapLiveticketEvent() {
	return {
		eventName: liveticketData.event,
		dateStart: liveticketData.start,
		dateEnd: liveticketData.end,
		maximumAttendees: liveticketData.max,
		eventLocation: liveticketData.where,
	};
}

function _mapLiveticketAttendees(eventId) {
	return liveticketData.attendees.map((attendee) => ({
		eventId: eventId,
		firstName: attendee.fn,
		lastName: attendee.ln,
		dateRegister: attendee.when,
	}));
}
// #endregion

// #region data mapping by import type (disisfine, truegister or liveticket)
export function mapEvent(importType) {
	switch (importType) {
		case "disisfine":
			return _mapDisisfineEvent();
		case "truegister":
			return _mapTruegisterEvent();
		case "liveticket":
			return _mapLiveticketEvent();
		default:
			throw new Error(`Type d'import inconnu: ${importType}`);
	}
}

export function mapAttendees(importType, eventId) {
	switch (importType) {
		case "disisfine":
			return _mapDisisfineAttendees(eventId);
		case "truegister":
			return _mapTruegisterAttendees(eventId);
		case "liveticket":
			return _mapLiveticketAttendees(eventId);
		default:
			throw new Error(`Type d'import inconnu: ${importType}`);
	}
}
// #endregion
