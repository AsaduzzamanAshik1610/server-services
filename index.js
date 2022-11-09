const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// user:servicedbuser
// password:j5BoEDTqCDzYC0GJ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWARD}@cluster0.ignp2kb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
   try{
     const userCollection = client.db('nodeMongoCrud').collection('users');
     const user = {
        name: 'testing test',
        email: 'testing@gmail.com'
     }
     const result = await userCollection.insertOne(user)
     console.log(result);
   }
   finally{

   }
}
run().catch(err => console.log(err));

app.get('/', (req, res)=>{
    res.send('Hellow review server side')
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})