import * as cheerio from "cheerio";
import { ScrapedData, UniversityItem } from "../types";

export async function scrapeWebpage(url: string): Promise<ScrapedData> {
  try {
    console.log(`Fetching content from ${url}...\n`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract data from div.uni-sidebar-box
    const universityData = $(".uni-sidebar-box");
    const subUniversity = $(universityData[0]);
    const universityTitle = subUniversity.find("h4 > a").text();
    const universityDesc = subUniversity.find("div > p > span").text();
    const countryData = $(universityData[1]);
    const countryTitle = countryData.find("h4").not("span").text();
    const countryDesc = countryData.find("p").text();
    const cityData = $(universityData[2]);
    const cityTitle = cityData.find("h4").not("span").text();
    const cityDesc = cityData.find("p").text();
    const university: UniversityItem = {
      school: { title: universityTitle, desc: universityDesc },
      country: { title: countryTitle, desc: countryDesc },
      city: { title: cityTitle, desc: cityDesc },
    };

    // Extract data from div.col-md-9.md-1 inside the container

    // Extract the title (Master's in Applied Theatre)
    const programTitle = $("h1 strong").text().trim();

    // Extract the university name
    const universityName = $(
      "h1 a[style='text-transform: none;color: grey;font-size: 0.9em;']"
    )
      .text()
      .trim();

    // Extract program details from the table
    const programDetails: any = {};
    $(".col-md-9.md-1 table > tbody tr")
      .not("div")
      .each((index, element) => {
        const key = $(element).find("th").text().trim();
        const value = $(element).find("td").text().trim();
        programDetails[key] = value;
      });

    console.info("Content fetched!\n");

    return {
      university,
      program: {
        title: programTitle,
        university: universityName,
        details: programDetails,
      },
    };
  } catch (error) {
    console.error("Error scraping webpage:", error);
    throw error;
  }
}
