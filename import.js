import liveticketData from "./data/liveticket.json" with {type: "json"};
import disisfineData from "./data/disisfine.json" with {type: "json"};
import truegisterData from "./data/truegister.json" with {type: "json"};
import {disisfine, liveticket, truegister} from "./main.js";

async function addLiveticket() {
  await liveticket.insertOne(liveticketData);
}

async function addTruegister() {
  await truegister.insertOne(truegisterData);
}

async function addDisisfine() {
  await disisfine.insertOne(disisfineData);
}

export async function runImport() {
  await addLiveticket();
  console.log('‍🧑🏼💻 Liveticket data imported !');
  console.log('');
  await addTruegister();
  console.log('🧑🏼💻 Truegister data imported !');
  console.log('');
  await addDisisfine();
  console.log('🏠🔥🐶☕️ Disisfine data imported !');
  console.log("Rapport au meme t'sais");
  console.log('');
}
