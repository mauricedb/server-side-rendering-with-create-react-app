const fs = require("fs");
const path = require("path");
const router = require("express").Router();

const { renderToNodeStream } = require("react-dom/server");
const React = require("react");
const ReactApp = require("../build/static/ssr/main").default;

console.log(ReactApp)

router.get("/", (req, res) => {
  var fileName = path.join(__dirname, "../build", "index.html");

  fs.readFile(fileName, "utf8", (err, file) => {
    if (err) {
      throw err;
    }

    const reactElement = React.createElement(ReactApp);

    const [head, tail] = file.split("{react-app}");
    res.write(head);
    const stream = renderToNodeStream(reactElement);
    stream.pipe(res, { end: false });
    stream.on("end", () => {
      res.write(tail);
      res.end();
    });
  });
});

module.exports = router;
