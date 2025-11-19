export const FAKE_DISISFINE = {
	e_name: "Mon event",
	e_start: "2024-10-05 16:00:00",
	e_finish: "2024-10-05 20:00:00",
	e_location: "1 rue truc - 75010 Machin",
	e_attendees_max: 10,
	attendees:
		'[["John", "Doe", "2023-03-12"],["Jane", "Dae", "2023-03-12",["Jerry", "Due", "2023-04-15"]]',
};

export const FAKE_LIVETICKET = {
	event: "Mon event",
	start: "2024-10-05 16:00:00",
	end: "2024-10-05 20:00:00",
	max: 10,
	where: "1 rue truc - 75010 Machin",
	attendees: [
		{ fn: "John", ln: "Doe", when: "2023-03-12" },
		{ fn: "Jane", ln: "Dae", when: "2023-03-14" },
		{ fn: "Jerry", ln: "Due", when: "2023-04-15" },
	],
};

export const FAKE_TRUEGISTER = {
	results: [
		{
			event: {
				event_name: "Mon event",
				event_begin: "2024-10-05 16:00:00",
				event_finish: "2024-10-05 20:00:00",
				event_where: "1 rue truc - 75010 Machin",
			},
			attendees: [
				{ attendee_1: "John", attendee_2: "Doe" },
				{ attendee_1: "Jane", attendee_2: "Dae" },
				{ attendee_1: "Jerry", attendee_2: "Due" },
			],
		},
	],
};
