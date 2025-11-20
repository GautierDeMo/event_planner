import liveticketData from "./data/liveticket.json" with { type: "json" };
import disisfineData from "./data/disisfine.json" with { type: "json" };
import truegisterData from "./data/truegister.json" with { type: "json" };
import { client, disisfine, liveticket, truegister } from "./main.js";

async function addLiveticket() {
	const resultat = await liveticket.insertOne(liveticketData);
  // console.log(resultat)
}

async function addTruegister() {
	const resultat = await truegister.insertOne(truegisterData);
  // console.log(resultat)
}

async function addDisisfine() {
	const resultat = await disisfine.insertOne(disisfineData);
  // console.log(resultat)
}

export async function runImport() {
  await addLiveticket();
  console.log('🧑🏼‍💻 Liveticket data imported !');
  console.log('');
  await addTruegister();
  console.log('🧑🏼‍💻 Truegister data imported !');
  console.log('');
  await addDisisfine();
  console.log('🏠🔥🐶☕️ Disisfine data imported !');
  console.log("Rapport au meme t'sais");
  console.log('');
}
