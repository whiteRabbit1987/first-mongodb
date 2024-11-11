const MongoClient = require("mongodb").MongoClient;
const dboper = require('./operations');

const url = "mongodb://localhost:27017/";
const dbname = "nucampsite";

(async function () {
    try {
        const client = await MongoClient.connect(url, {});
        console.log("Connected correctly to server");

        const db = client.db(dbname);

        try {
            const dropResult = await db.dropCollection("campsites");
            console.log("Dropped Collection:", dropResult);
        } catch (err) {
            console.log("No collection to drop.");
        }

        const documentToInsert = {
            name: "Breadcrumb Trail Campground",
            description: "Test",
        };

        const insertResult = await dboper.insertDocument(
            db,
            documentToInsert,
            "campsites"
        );
        console.log("Insert Document:", {
            _id: insertResult.insertedId,
            ...documentToInsert,
        });

        const docs = await dboper.findDocuments(db, "campsites");
        console.log("Found Documents:", docs);

        const updateResult = await dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" },
            "campsites"
        );
        console.log("Updated Document Count:", updateResult.modifiedCount);

        const updateDocs = await dboper.findDocuments(db, "campsites");
        console.log("Found Documents:", updateDocs);

        const deleteResult = await dboper.removeDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            "campsites"
        );
        console.log("Deleted Document Count:", deleteResult.deleteCount);

        await client.close();
    } catch (err) {
        console.log(err);
    }
})();
