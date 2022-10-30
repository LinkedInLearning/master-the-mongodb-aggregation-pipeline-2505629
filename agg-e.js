const { ObjectId } = require("bson");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

const agg = [
  {
    $group: {
      _id: "$customer._id",
      summary: {
        $accumulator: {
          init: `function(){
            return { orders: 0, sum: 0}
          }`,
          accumulate: `function(state, total){
            return {
              orders: state.orders + 1,
              sum: state.sum + total
            }
          }
          `,
          merge: `function(state1, state2){
            return {
              orders: state1.orders + state2.orders,
              sum: state1.sum + state2.sum
            }
          }`,
          finalize: `function(state){
            if(state.sum > 5000){
              return {
                orders: state.orders,
                sum: state.sum,
                vip: true
              }
            } else {
              return {
                orders: state.orders,
                sum: state.sum,
                vip: false
              }
            }
          }`,
          accumulateArgs: ["$total"],
          lang: "js",
        },
      },
    },
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
