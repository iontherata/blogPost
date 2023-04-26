const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

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

mongoose.connect("mongodb://localhost:27017/blogDB");

const blogSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog1 = new Blog({
  title: "Welcome",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur dolorum blanditiis architecto nihil dolores quae debitis velit ipsa mollitia, laudantium quaerat perferendis consequatur totam iste sed, earum, pariatur suscipit veritatis ducimus accusamus repellat harum! Natus molestias libero delectus eveniet, accusamus eum? Accusamus delectus odio saepe suscipit ullam eos voluptatibus, asperiores dolore non ",
});

const blog2 = new Blog({
  title: "to the",
  text: "lorem100",
});

const blog3 = new Blog({
  title: "lands between",
  text: "lorem150",
});

const allBlogs = [blog1, blog2, blog3];

app.get("/", function (req, res) {
  Blog.find({})
    .then(function (foundItems) {
      if (foundItems.length === 0) {
        Blog.insertMany(allBlogs);

        res.redirect("/");
      } else {
        res.render("home", {
          pageContent: homeStartingContent,
          posts: foundItems,
        });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
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
  const blog = new Blog({
    title: req.body.postTitle,
    text: req.body.postText,
  });
  blog.save();
  // posts.push(post);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const deletedBlogID = req.body.deleteButton;
  const deletedBlog = await Blog.findByIdAndRemove(deletedBlogID);
  res.redirect("/");
});

app.get("/posts/:blogPost", async (req, res) => {
  const blog = req.params.blogPost;
  const blogPage = await Blog.findOne({ title: blog });
  
  
    res.render('blog', {title: blogPage.title, text: blogPage.text})
  
  
  // const requestedBlogPost = _.lowerCase(req.params.blogPost);

  // for (let post of posts) {
  //   const storedTitle = _.lowerCase(post.title);
  //   if (storedTitle === requestedBlogPost) {
  //     res.render("blog", { title: post.title, text: post.text });
  //   }
  // }
});

app.listen(3000, function () {
  console.log("HELLO WORLD");
});
