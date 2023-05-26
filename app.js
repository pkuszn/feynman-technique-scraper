import express from "express";
const port = 6000;
const app = express();

app.get("/", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain"});
    res.end("Hello word");
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});