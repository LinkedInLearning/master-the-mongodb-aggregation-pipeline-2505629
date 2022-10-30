const { ObjectId } = require("bson");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $limit: 10,
  },
  {
    $addFields: {
      shipping: {
        $function: {
          body: `function(zipCode) {
                    let firstDigit = parseInt(zipCode[0]);
                    switch(firstDigit){
                      case 0:
                      case 1:
                      case 2:
                        return "1 day";
                      case 3:
                      case 4:
                      case 5:
                      case 6:
                        return "2 day";
                      default:
                        return "3 days";
                    }
                  }`,
          args: ["$address.zipCode"],
          lang: "js",
        },
      },
    },
  },
];

async function run() {
  try {
    const database = client.db("linkedin");
    const result = await database
      .collection("customers")
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
