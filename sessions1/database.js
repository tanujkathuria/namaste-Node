const { MongoClient } = require("mongodb");

const URI =
  "mongodb+srv://tanujkathuriakathuria:GWGph8nRLK6d9fxN@developersworld.dtykzv9.mongodb.net/?retryWrites=true&w=majority&appName=developersworld";

const client = new MongoClient(URI);
const dbName = "developersworld";
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("projects");

  // read the document
  const findResult = await collection.find({ technology: "Others" }).toArray();
  console.log("Found documents =>", findResult);

  const countDocs = await collection.countDocuments({ technology: "Others" });
  console.log("count of docs is " + countDocs);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
