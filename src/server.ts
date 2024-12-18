import express, { Application } from "express";
import { scraperController } from "./controller/scrapeController";
import { indexController } from "./controller/indexController";

const app: Application = express();
const port = 3000;

app.use(express.json());

app.get("/", indexController);

app.post("/scrape", scraperController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}\n`);
});
