import express from "express";
import cors from "cors";
import { allowCrossDomain, corsOptions } from "./config/corsOptions.js";
import errorHandler from "./middleware/errorHandler.js";
import scraperApi from "./api/scraper.js";

const PORT = 6200;
const HOST = "0.0.0.0";
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(allowCrossDomain);
app.use(errorHandler);

app.use('/scrap', scraperApi);

app.all('/*', (req, res) => {
    res.status(400);
});

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});