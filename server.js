import express from "express";
import mongoose from "mongoose";
import Data from './data.js';
import Videos from './dbModel.js';
// to use "import", it requires "module" in package.json

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
// pass the response of json object and read it for me
// it is used when posting.
app.use(express.json());
// whenever we receive request, we will set headers, which means we accept all requests that pass middlewares.
// then we pop to the functions in here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
    res.setHeader('Access-Control-Allow-Headers', '*'),
    next();
})


// DB config
// get connection from mongoDB cluster
const connection_url = "mongodb+srv://admin:cIzaNeXtxidtuYRs@cluster0.n4yta.mongodb.net/tiktok?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})


// api endpoints
// if frontend sends request (eg. Rest API: get/post(upload)/delete), respond 200 if it's working.
// then backend send reply "hello world"
// 200 -> okay. // 404 -> page not found // ...
app.get('/', (req,res) => res.status(200).send("hello world"));

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  // you can use filter: find({filter here}, (err, data)...)
  Videos.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

app.post("/v2/posts", (req, res) => {
  // POST request is to ADD DATA to the db
  // It will let us ADD a video DOCUMENT to the videos COLLECTION
  const dbVideos = req.body;

  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
})

// listen: make the app listen the request
app.listen(port, ()=>console.log(`listening on localhost: ${port}`));

