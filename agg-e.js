const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $lookup: {
      from: "products",
      localField: "items",
      foreignField: "_id",
      as: "items",
    },
  },
];

async function run() {
  try {
    const database = client.db("linkedin");
    const result = await database
      .collection("vendors")
      .aggregate(agg)
      .toArray();

    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

run();
