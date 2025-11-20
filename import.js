import { MongoClient } from "mongodb";
import liveticketData from "./data/liveticket.json" with { type: "json" };
import disisfineData from "./data/disisfine.json" with { type: "json" };
import truegisterData from "./data/truegister.json" with { type: "json" };

const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

const database = client.db("event_planner");

const disisfine = database.collection("disisfine");
const truegister = database.collection("truegister");
const liveticket = database.collection("liveticket");

async function addLiveticket() {
	const resultat = await liveticket.insertOne(liveticketData);
  console.log(resultat)
}

async function addTruegister() {
	const resultat = await truegister.insertOne(truegisterData);
  console.log(resultat)
}

async function addDisisfine() {
	const resultat = await disisfine.insertOne(disisfineData);
  console.log(resultat)
}

async function run() {
  try {
    await addLiveticket().then(console.log('Liveticket data imported !'));
    await addTruegister().then(console.log('Truegister data imported !'));
    await addDisisfine().then(console.log('Disisfine data imported !'));

  } finally {
    await client.close();
  }
}

await run().catch(console.dir);