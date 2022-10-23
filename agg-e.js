const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $match: {
      quantity: {
        $gt: 500,
      },
    },
  },
  {
    $addFields: {
      discount: {
        $cond: [
          {
            $lte: ["$price", 500],
          },
          0.4,
          0.65,
        ],
      },
    },
  },
  {
    $addFields: {
      salePrice: {
        $multiply: ["$price", "$discount"],
      },
    },
  },
  {
    $unset: "quantity",
  },
];

async function run() {
  try {
    const database = client.db("linkedin");
    const result = await database
      .collection("products")
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
