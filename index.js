const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = 4000;

app.use(cors());
app.use(express.json());
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;


var uri = "mongodb://marketUser:market123@cluster0-shard-00-00.sr6rc.mongodb.net:27017,cluster0-shard-00-01.sr6rc.mongodb.net:27017,cluster0-shard-00-02.sr6rc.mongodb.net:27017/market?ssl=true&replicaSet=atlas-r1btt3-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
    console.log(err);
  const productsCollection = client.db("market").collection("items");

// Inserting data into database

app.post("/addActivity", (req, res) => {
    const product = req.body;
    console.log(product);
    productsCollection.insertOne(product).then((result) => {
      console.log(result);
      res.send(result);
    });
  });

//Getting Data
app.get('/activity',(req,res)=>{
  productsCollection.find()
  .toArray((err,documents)=>{
      res.send(documents);
  })
})

	// change Status:
	app.patch("/updateStatus/:id", (req, res) => {
		productsCollection.updateOne(
			{ _id: ObjectId(req.params.id) },
			{
				$set: {
					status: req.body.status,
				},
			}
		).then((result) => {
      console.log(result);
			res.send(result);
		});
	})
	// change Status:
	app.patch("/addStatus/:id", (req, res) => {
		productsCollection.updateOne(
			{ _id: ObjectId(req.params.id) },
			{
				$set: {
					disable: req.body.disable,
				},
			}
		).then((result) => {
      console.log(result);
			res.send(result);
		});
	})

});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
app.listen(process.env.PORT || port);