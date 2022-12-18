const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
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
        const patientCollection = client.db("patient-register").collection("patients");

        app.get('/hospitals', async(req, res)=>{
            const query = {}
            const hospitals = await hospitalCollection.find(query).toArray()
            res.send(hospitals)
        });

        app.post('/Psychiatrist', async(req, res)=>{
            const Psychiatrist = req.body;
            const result = await psychiatristCollection.insertOne(Psychiatrist);
            res.send(result)
        });

        app.get('/Psychiatrist', async (req, res)=>{
            const email = req.query.email;
            const query = {email:email};
            const result = await psychiatristCollection.findOne(query);
            res.send(result)
        })

        app.post('/patient', async(req, res)=>{
            const patient = req.body;
            const result = await patientCollection.insertOne(patient);
            res.send(result)
        });

        app.get('/hospital/:id', async(req, res)=>{
            const id = req.params.id;
            const queryId = {_id: ObjectId(id)}
            const hospitalName = await hospitalCollection.findOne(queryId);
            const query = { hospital: id }
            const doctorsArray = await psychiatristCollection.find(query).toArray();
            const patientArray = await patientCollection.find(query).toArray();
            res.send({hospitalName, doctorsArray, patientArray})
        });

        app.get('/patient', async(req, res)=>{
            const id = req.query.psychiatristId;
            const query = {psychiatristId:id};
            const patient =  await patientCollection.count(query);
            const pcount = [patient]
            res.send(pcount)
        });
        
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
