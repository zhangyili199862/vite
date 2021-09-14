const express = require("express");
const fs = require("fs");
const app = express();

const { createServer: createViteServer } = require("vite");

createViteServer({
  server: {
    middlewareMode: "ssr",
  },
}).then((vite) => {
  app.use(vite.middlewares);
  app.get("*", async (req, res) => {
    // res.send(fs.readFileSync("index.html"));
    const template = fs.readFileSync("index.html", "utf-8");
    const { render } = await vite.ssrLoadModule("/src/server-entry.jsx");
    debugger;
    const html = await render(req.url);
    const responseHtml = template.replace("<!--APP_HEML-->", html);
    res.set("content-type", "text/html").send(responseHtml);
  });
  app.listen(4000);
});
