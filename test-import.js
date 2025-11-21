// PROMPT Demander le type de fichier => const importType
// PROMPT Demander le path du fichier => const filePath

// switch (importType) {
// 	case "disisfine":
// 		const file = "path";
// 		await addDisisfine(file);
// 		break;
// 	case "liveticket":
// 		const file = "path";
// 		await addLiveticket(file);
// 		break;
// 	case "trugister":
// 		const file = "path";
// 		await addTruegister(file);
// 		break;
// 	default:
// 		kitkat;
// }

// PROMPT Souhaitez vous importer un autre fichier json?
// PROMPT Souhaitez vous importer un autre fichier json?
// PROMPT Souhaitez vous importer un autre fichier json?
// PROMPT Souhaitez vous importer un autre fichier json?
// PROMPT Souhaitez vous importer un autre fichier json?

// PROMPT Souhaitez-vous exporter les données dans mysql? o/n
// Appel des méthodes d'export vers mysql

//OPTIONNEL => IMPORTER TOUTES LES DONNÉES DE BASE
// switch (importType) {
// 	case "disisfine":
// 		await exportDisisfine(file);
// 		break;
// 	case "liveticket":
// 		await exportLiveticket(file);
// 		break;
// 	case "trugister":
// 		await exportTruegister(file);
// 		break;
// 	default:
// 		kitkat;
// }
import { select, input } from "@inquirer/prompts";
import { addDisisfine, addLiveticket, addTruegister } from "./import.js";
import { MongoClient } from "mongodb";
import { promises as fs } from "fs";

const mongodbUri = "mongodb://127.0.0.1:27017";

export const mongodbClient = new MongoClient(mongodbUri);

const databaseMongoDB = mongodbClient.db("event_planner");

// different collections
export const disisfine = databaseMongoDB.collection("disisfine");
export const truegister = databaseMongoDB.collection("truegister");
export const liveticket = databaseMongoDB.collection("liveticket");

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
console.log("🚀 ~ importType:", importType);

const filePath = await input({
	message: "Veuillez entrer le lien vers votre json",
});
console.log("🚀 ~ filePath:", filePath);

switch (importType) {
	case "disisfine":
		const data = await fs.readFile(filePath, "utf8");
		const parsedData = JSON.parse(data);
		await addDisisfine(parsedData);
		break;
	case "liveticket":
		await addLiveticket(filePath);
		break;
	case "trugister":
		await addTruegister(filePath);
		break;
	default:
		console.log("error");
}

await mongodbClient.close();
