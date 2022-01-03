import express from "express";
import mongoose from "mongoose";
import bodyParser, { urlencoded } from "body-parser";

const app = express();
const port = 3000; // | process.env.port

mongoose.connect("mongodb://localhost:27017/testDB");

const db = mongoose.connection;
const review = mongoose.Schema({
  title: "string",
  content: "string",
});

const Review = mongoose.model("Schema", review);
const newReview = new Review({ title: "Hello world", content: "Such fun!" });
newReview.save(function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log("Saved!");
  }
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
  Review.find(function (error, data) {
    console.log("--- Read all ---");
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  console.log(title, content);
  // mongoose로 db에 추가하는 작업
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// mongoose 출처: https://javafa.gitbooks.io/nodejs_server_basic/content/chapter12.html
