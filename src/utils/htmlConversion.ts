import * as cheerio from "cheerio";

export async function processHtmlArray(htmlArray: string[]): Promise<any[]> {
  return htmlArray.map((html, index) => {
    const $ = cheerio.load(html);

    // Extract data for each HTML string
    const options = $("option")
      .map((_, option) => {
        const value = $(option).attr("value")?.trim() || ""; // Get and trim the value
        const label = $(option).text().trim(); // Get and trim the label
        return { value, label };
      })
      .get(); // Converts Cheerio object to an array

    return options;
  });
}
