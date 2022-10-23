const fs = require("fs");
const path = require("path");
const { ObjectId, MongoClient } = require("mongodb");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("linkedin-learning-test");

    let customers = require("./customers.json");
    console.log(customers);
    const custResult = await database
      .collection("customers")
      .insertMany(customers);

    let products = fs.readFileSync("products.json");
    const prodResult = await database
      .collection("products")
      .insertMany(products);

    let vendors = fs.readFileSync("vendors.json");
    const vendorResult = await database
      .collection("vendors")
      .insertMany(vendors);

    const orders1 = fs.readFileSync("orders-1.json");
    const orders2 = fs.readFileSync("orders-2.json");
    const orders3 = fs.readFileSync("orders-3.json");
    const orders4 = fs.readFileSync("orders-4.json");
    const orders5 = fs.readFileSync("orders-5.json");

    const orders1Result = await database
      .collection("orders")
      .insertMany(orders1);
    const orders2Result = await database
      .collection("orders")
      .insertMany(orders2);
    const orders3Result = await database
      .collection("orders")
      .insertMany(orders3);
    const orders4Result = await database
      .collection("orders")
      .insertMany(orders4);
    const orders5Result = await database
      .collection("orders")
      .insertMany(orders5);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
