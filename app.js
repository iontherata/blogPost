const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dolorum blanditiis architecto nihil dolores quae debitis velit ipsa mollitia, laudantium quaerat perferendis consequatur totam iste sed, earum, pariatur suscipit veritatis ducimus accusamus repellat harum! Natus molestias libero delectus eveniet, accusamus eum? Accusamus delectus odio saepe suscipit ullam eos voluptatibus, asperiores dolore non ";

const aboutContent =
  "autem sunt magnam animi libero! Ratione dignissimos, quasi architecto possimus tempore quaerat, sed nemo aperiam, sit sunt aliquid amet pariatur. Quisquam, tempore non. Nobis sit magnam distinctio qui molestias voluptatum quo quod officiis atque, amet eum incidunt similique inventore voluptas. Nesciunt at ea incidunt. Error quidem eum minima accusamus ";

const contactContent =
  "fugit ratione earum eveniet reiciendis incidunt odio, deserunt nam veniam commodi, deleniti debitis ipsa eaque non assumenda doloribus laborum neque at unde! Ea sapiente totam, architecto eius eligendi praesentium, at harum rem dolore hic expedita minus iste quo reiciendis molestiae ut ad sit, obcaecati temporibus repellat? Voluptas, pariatur deserunt?";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", { pageContent: homeStartingContent, posts: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { pageContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { pageContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    text: req.body.postText,
  };
  posts.push(post);

  res.redirect("/");
});







app.listen(3000, function () {
  console.log("HELLO WORLD");
});
