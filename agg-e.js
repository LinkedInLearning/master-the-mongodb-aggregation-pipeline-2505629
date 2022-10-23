const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $group: {
      _id: "$customer.fullName",
      totalOrders: {
        $count: {},
      },
      totalItemsPurchased: {
        $sum: {
          $size: "$items",
        },
      },
      totalSpent: {
        $sum: "$total",
      },
    },
  },
  {
    $limit: 10,
  },
];

async function run() {
  try {
    const database = client.db("linkedin");
    const result = await database.collection("orders").aggregate(agg).toArray();
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

run();
