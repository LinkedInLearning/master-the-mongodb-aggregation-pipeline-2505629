const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $group: {
      _id: "$customer.fullName",
      "numberOfOrders": { $count: {} },
      "totalItems": { $sum: { "$size": "$items" } },
      "moneySpent": { $sum: "$total" }
    }
  },
  { $sort: { "numberOfOrders": -1 } }
];

async function run() {
  try {
    const database = client.db("linkedin");
    const result = await database.collection("orders").aggregate(agg).toArray();
    console.log(result);
    console.log(result.length);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

run();
