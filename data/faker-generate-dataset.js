require("dotenv").config();
const { faker } = require("@faker-js/faker");
const { ObjectId, MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const customers = [];
const orders = [];
const products = [];
const vendors = [];

for (let i = 0; i < 100000; i++) {
  const id = new ObjectId();
  let state = faker.address.stateAbbr();
  let person = {
    _id: id,
    fullName: faker.name.fullName(),
    address: {
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: state,
      zipCode: faker.address.zipCodeByState(state),
    },
  };

  customers.push(person);
}

for (let i = 0; i < 20000; i++) {
  let product = {
    _id: new ObjectId(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price(1, 1200, 2)),
    quantity: Number(faker.random.numeric(3)),
  };

  products.push(product);
}

for (let i = 0; i < 250000; i++) {
  let numOfOrders = Math.floor(Math.random() * 10) + 1;
  let items = [];
  let price = 0;

  for (let j = 0; j < numOfOrders; j++) {
    let product = products.random();
    items.push(product);
    price += product.price;
  }

  let order = {
    _id: new ObjectId(),
    order: faker.finance.account(10),
    date: faker.date.recent(365),
    customer: customers.random(),
    items: items,
    total: price,
  };

  orders.push(order);
}

for (let i = 0; i < 1000; i++) {
  let items = [];
  let numOfProducts = Math.floor(Math.random() * 100) + 1;
  for (let j = 0; j < numOfProducts; j++) {
    let product = products.random();
    items.push(product._id);
  }

  let vendor = {
    _id: new ObjectId(),
    name: faker.company.name(),
    items: items,
  };

  vendors.push(vendor);
}

for (let i = 0; i < products.length; i++) {
  let vendor = vendors.random();
  products[i].vendor = vendor._id;
}

async function run() {
  try {
    const database = client.db("linkedin-learning");
    // create an array of documents to insert
    const custResult = await database
      .collection("customers")
      .insertMany(customers);
    const prodResult = await database
      .collection("products")
      .insertMany(products);
    const orderResult = await database.collection("orders").insertMany(orders);
    const vendorResult = await database
      .collection("vendors")
      .insertMany(vendors);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
