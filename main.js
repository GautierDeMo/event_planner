import { MongoClient } from "mongodb";
import { runImport } from "./import.js";
import { mapEvent } from "./mapper.js";

const uri = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(uri);

const database = client.db("event_planner");

// different collections
export const disisfine = database.collection("disisfine");
export const truegister = database.collection("truegister");
export const liveticket = database.collection("liveticket");

// find all documents from each collections
async function allDisisfine() {
  const allDatas =  await disisfine.find({}).toArray();
  allDatas.forEach(disisfine => {
    const mappedDisisfine =mapEvent('disisfine', disisfine);
    console.log(mappedDisisfine);
  });
}

await runImport().catch(console.dir);

await allDisisfine();

await client.close();
