const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// user:servicedbuser
// password:j5BoEDTqCDzYC0GJ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWARD}@cluster0.ignp2kb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const userCollection = client.db('tourservice').collection('users');
    const reviewCollection = client.db('tourservice').collection('review')
    app.get('/services/upcoming', async (req, res) => {
      const query = {}
      const cursor = userCollection.find(query);
      const services = await cursor.limit(3).toArray();
      res.send(services);
    })

    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = userCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    })

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const service = await userCollection.findOne(query);
      res.send(service);
    })
    app.post('/review', async(req, res)=>{
      const order = req.body;
      const result = await reviewCollection.insertOne(order)
      res.send(result);
    })

  }
  finally {

  }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hellow review server side')
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})