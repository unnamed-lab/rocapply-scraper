import express, { Application } from 'express';
import { scraperController } from './controller/scrapeController';

const app: Application  = express();
const port = 3000;

app.use(express.json());


app.post('/scrape', scraperController);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

