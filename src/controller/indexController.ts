import express, { Request, Response } from "express";
import { marked } from "marked";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const indexController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const readmePath = path.join(__dirname, "../../", "README.md");
    const readmeContent = await fs.readFile(readmePath, "utf-8");
    const htmlContent = marked(readmeContent);

    console.log(readmePath);

    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Web Scraper Server</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            pre {
              background-color: #f4f4f4;
              padding: 10px;
              border-radius: 5px;
              overflow-x: auto;
            }
            code {
              font-family: Consolas, Monaco, 'Andale Mono', monospace;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

    res.send(html);
  } catch (error) {
    console.error("Error rendering home page:", error);
    res.status(500).send("An error occurred while rendering the home page");
  }
};
