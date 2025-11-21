import { select, input } from "@inquirer/prompts";
import { addDisisfine, addLiveticket, addTruegister } from "./import.js";
import { MongoClient } from "mongodb";
import mysql from "mysql2/promise";
import { promises as fs } from "fs";
import { mapAttendees, mapEvent } from "./mapper.js";
import { createEvent, registerPerson } from "./export.js";

const mongodbUri = "mongodb://127.0.0.1:27017";
export const mongodbClient = new MongoClient(mongodbUri);
const databaseMongoDB = mongodbClient.db("event_planner");

export const mysqlClient = await mysql.createConnection({
	host: "127.0.0.1",
	user: "admin",
	password: "1234",
	database: "event_planner",
});

// different collections
export const disisfine = databaseMongoDB.collection("disisfine");
export const truegister = databaseMongoDB.collection("truegister");
export const liveticket = databaseMongoDB.collection("liveticket");

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
let isDoneImportingData = false;
let isFilePathCorrect = false;

async function fsToJson(filePath) {
	try {
		const data = await fs.readFile(filePath, "utf8");
		console.log("ça marche!");
		return JSON.parse(data);
	} catch (err) {
		console.log("lien vraiment incorrect");
		return;
	}
}

while (isDoneImportingData === false) {
	const importType = await select({
		message: "Quel type de fichier voulez-vous importer",
		choices: [
			{
				name: "Disisfine",
				value: "disisfine",
			},
			{
				name: "Liveticket",
				value: "liveticket",
			},
			{
				name: "Truegister",
				value: "truegister",
			},
		],
	});

	let parsedData;
	isFilePathCorrect = false;

	while (isFilePathCorrect === false) {
		let filePath = await input({
			message:
				"Veuillez entrer le lien vers votre json ex: './data/disisfine.json'",
		});

		parsedData = await fsToJson(filePath);
		if (parsedData) {
			isFilePathCorrect = true;
		} else {
			console.log("⚠️  Chemin de fichier invalide. Veuillez réessayer.");
		}
	}

	switch (importType) {
		case "disisfine":
			await addDisisfine(parsedData);
			console.log("🏠🔥🐶☕️ Import vers MongoDB du format 'Disisfine'");
			break;
		case "liveticket":
			await addLiveticket(parsedData);
			console.log("🧑🏼‍💻 Import vers MongoDB du format 'Truegister'");
			break;
		case "truegister":
			await addTruegister(parsedData);
			console.log("🧑🏼‍💻 Import vers MongoDB du format 'Liveticket'");
			break;
		default:
			console.log("error during import");
	}
	isDoneImportingData = await select({
		message: "Voulez-vous importer d'autres fichiers?",
		choices: [
			{
				name: "Oui",
				value: false,
			},
			{
				name: "Non",
				value: true,
			},
		],
	});
}

const isExport = await select({
	message: "Voulez-vous exporter les données vers MySQL ?",
	choices: [
		{
			name: "Oui",
			value: true,
		},
		{
			name: "Non",
			value: false,
		},
		{
			name: "Exit",
			value: "exit",
		},
	],
});

switch (isExport) {
	case true:
		await allDisisfine();
		console.log("🏠🔥🐶☕️ Export vers MySQL du format 'Disisfine'");
		await allLiveticket();
		console.log("🧑🏼‍💻 Export vers MySQL du format 'Truegister'");
		await allTruegister();
		console.log("🧑🏼‍💻 Export vers MySQL du format 'Liveticket'");
		break;
	case false:
		break;
	case "exit":
		break;
	default:
		console.log("error during export");
}

await mongodbClient.close();
await mysqlClient.end();
