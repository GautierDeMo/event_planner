import { MongoClient } from "mongodb";
import { runImport } from "./import.js";
import { mapAttendees, mapEvent } from "./mapper.js";
import mysql from "mysql2/promise";
import { createEvent, registerPerson } from "./export.js";

// const mongodbUri = "mongodb://127.0.0.1:27017";

// export const mongodbClient = new MongoClient(mongodbUri);
export const mysqlClient = await mysql.createConnection({
	host: "127.0.0.1",
	user: "admin",
	password: "1234",
	database: "event_planner",
});

// const databaseMongoDB = mongodbClient.db("event_planner");

// // different collections
// export const disisfine = databaseMongoDB.collection("disisfine");
// export const truegister = databaseMongoDB.collection("truegister");
// export const liveticket = databaseMongoDB.collection("liveticket");

// find all documents from each collection and map them
async function allDisisfine() {
	const allDatas = await disisfine.find({}).toArray();
	for (const disisfine of allDatas) {
		const mappedDisisfine = mapEvent("disisfine", disisfine);
		await createEvent(mappedDisisfine);
		mappedDisisfine.attendees = mapAttendees("disisfine", disisfine);
		await registerPerson(mappedDisisfine.attendees);
	}
}

async function allTruegister() {
	const allDatas = await truegister.find({}).toArray();
	for (const truegister of allDatas) {
		const mappedTruegister = mapEvent("truegister", truegister);
		await createEvent(mappedTruegister);
		mappedTruegister.attendees = mapAttendees("truegister", truegister);
		await registerPerson(mappedTruegister.attendees);
	}
}

async function allLiveticket() {
	const allDatas = await liveticket.find({}).toArray();
	for (const liveticket of allDatas) {
		const mappedLiveticket = mapEvent("liveticket", liveticket);
		await createEvent(mappedLiveticket);
		mappedLiveticket.attendees = mapAttendees("liveticket", liveticket);
		await registerPerson(mappedLiveticket.attendees);
	}
}

await runImport().catch(console.dir);

await allDisisfine();
await allTruegister();
await allLiveticket();

await mongodbClient.close();
await mysqlClient.end();
