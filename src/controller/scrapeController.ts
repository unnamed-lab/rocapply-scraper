import express, { Request, Response } from 'express';
import { scrapeWebpage } from "../utils";

export const scraperController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'URL is required in the request body' });
    }

    const scrapedData = await scrapeWebpage(url);
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({ 
      error: 'An error occurred while scraping the webpage',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}