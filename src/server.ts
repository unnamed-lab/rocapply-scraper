import express, { Application } from "express";
import { scraperController } from "./controller/scrapeController";
import { indexController } from "./controller/indexController";
import { scraperCountryController } from "./controller/scrapeCountryController";
import * as dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", indexController);

app.post("/scrape", scraperController);

app.post("/scrape/country", scraperCountryController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}\n`);
});
