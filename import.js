import { disisfine, liveticket, truegister } from "./main.js";

export async function addLiveticket(liveticketData) {
	await liveticket.insertOne(liveticketData);
}

export async function addTruegister(truegisterData) {
	await truegister.insertOne(truegisterData);
}

export async function addDisisfine(disisfineData) {
	await disisfine.insertOne(disisfineData);
}

export async function runImport() {
	await addLiveticket();
	await addTruegister();
	await addDisisfine();
}
