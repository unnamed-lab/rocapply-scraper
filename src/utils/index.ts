import * as cheerio from "cheerio";
import { ScrapedData, UniversityItem } from "../types";
import { formFetch } from "./fetchAPI";
import { processHtmlArray } from "./htmlConversion";

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

export async function scrapeCountryWebpage(url: string): Promise<any> {
  try {
    console.log(`Fetching content from ${url}...\n`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const options: { value: string; label: string }[] = $("#countryID option")
      .map((i, option) => {
        if (i === 0) return; // Skip the first option
        const value = $(option).attr("value")?.trim() || ""; // Get and trim the value
        const label = $(option).text().trim(); // Get and trim the label
        return { value, label };
      })
      .get(); // Converts Cheerio object to an array

    const universitiesHTML: any[] = await Promise.all(
      options.map(async ({ value }, i) => {
        // if (i === 0) return; // Skip the first option
        const result = await formFetch(
          "https://www.rocapply.com/AjaxProgramDataHome",
          value
        );

        if (!result) {
          throw new Error("Failed to fetch data");
        }

        const resultHtml = String(result);
        return resultHtml;
      })
    );

    // const university = await processHtmlArray(universitiesHTML);

    // TODO - Process the university data
    // Format data to array as [{country: { value: '...', label: '...' }}]

    // const reformat = options.map((option, index) => {
    //   return {
    //     country: option,
    //     universities: university[index],
    //   };
    // });

    // console.info(reformat);
    // console.info(university);

    console.info("Content fetched!\n");

    return {
      result: "",
    };
  } catch (error) {
    console.error("Error scraping webpage:", error);
    throw error;
  }
}

export async function getUrlsAfterSelection(
  htmlArray: string[],
  country: string,
  university: string,
  program: string
): Promise<string[]> {
  const urls: string[] = [];

  for (const html of htmlArray) {
    const $ = cheerio.load(html);

    // Find the form or element that contains the selection
    const form = $("form"); // Adjust the selector as needed

    if (form.length) {
      const actionUrl = form.attr("action");
      if (actionUrl) {
        const url = new URL(actionUrl, "https://rocapply.com");
        url.searchParams.set("country", country);
        url.searchParams.set("university", university);
        url.searchParams.set("program", program);
        urls.push(url.toString());
      }
    }
  }

  return urls;
}
