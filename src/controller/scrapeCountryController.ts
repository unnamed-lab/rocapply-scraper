import express, { Request, Response } from "express";
import { scrapeCountryWebpage } from "../utils";

export const scraperCountryController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .json({ error: "URL is required in the request body" });
    }

    const scrapedData = await scrapeCountryWebpage(url);
    res.json(scrapedData);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while scraping the webpage",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
