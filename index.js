const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion} = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://psychiatrists_admin:JPljIviZAuircG9t@cluster0.r6cd8c9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const hospitalCollection = client.db("patient-register").collection("hospitals");
        const psychiatristCollection = client.db("patient-register").collection("psychiatrists");

        app.get('/hospitals', async(req, res)=>{
            const query = {}
            const hospitals = await hospitalCollection.find(query).toArray()
            res.send(hospitals)
        });

        app.post('/Psychiatrist', async(req, res)=>{
            const Psychiatrist = req.body;
            const result = await psychiatristCollection.insertOne(Psychiatrist);
            res.send(result)
        })
        
    }catch{

    }
}
run()
.catch(err=> console.log(err))

app.get('/', (req, res) => {
    res.send('running')
});
  app.listen(port, () => {
    console.log('start')
});
