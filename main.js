import {MongoClient} from "mongodb";
import {runImport} from "./import.js";
import {mapAttendees, mapEvent} from "./mapper.js";

const uri = "mongodb://127.0.0.1:27017";

export const client = new MongoClient(uri);

const database = client.db("event_planner");

// different collections
export const disisfine = database.collection("disisfine");
export const truegister = database.collection("truegister");
export const liveticket = database.collection("liveticket");

// find all documents from each collection and map them
async function allDisisfine() {
    const allDatas = await disisfine.find({}).toArray();
    console.log('--- DISISFINE ---');
    for (const disisfine of allDatas) {
        const mappedDisisfine = mapEvent('disisfine', disisfine);
        // ajouter l'export dans mysql
        mappedDisisfine.attendees = mapAttendees('disisfine', disisfine._id, disisfine);
        // console.log(mappedDisisfine);
    }
    console.log('');
}

async function allTruegister() {
    const allDatas = await truegister.find({}).toArray();
    console.log('--- TRUEGISTER ---');
    for (const truegister of allDatas) {
        const mappedTruegister = mapEvent('truegister', truegister);
        // ajouter l'export dans mysql
        mappedTruegister.attendees = mapAttendees('truegister', truegister._id, truegister);
        // console.log(mappedTruegister);
    }
    console.log('');
}

async function allLiveticket() {
    const allDatas = await liveticket.find({}).toArray();
    console.log('--- LIVETICKET ---');
    for (const liveticket of allDatas) {
        const mappedLiveticket = mapEvent('liveticket', liveticket);
        // ajouter l'export dans mysql
        mappedLiveticket.attendees = mapAttendees('liveticket', liveticket._id, liveticket);
        // console.log(mappedLiveticket);
    }
}

await runImport().catch(console.dir);

await allDisisfine();
await allTruegister();
await allLiveticket();

await client.close();
