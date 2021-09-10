const express = require("express");
const app = express();
const port = 4000;

const mainfest = require("./dist/manifest.json");
app.use(express.static("dist"));
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("index", {
    title: "Hey",
    message: "hello",
    index: mainfest["index.html"].file,
    vendor: mainfest["index.html"].imports.vendor,
    css: mainfest["index.html"].css[0],
  });
});

app.listen(port);
