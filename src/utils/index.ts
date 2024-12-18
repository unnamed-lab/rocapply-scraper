
import * as cheerio from 'cheerio';
import { MainContentItem, ScrapedData, SidebarItem } from '../types';

export async function scrapeWebpage(url: string): Promise<ScrapedData> {
    try {
      console.log(`Fetching content from ${url}...`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Extract data from div.uni-sidebar-box
      const sidebarData: SidebarItem[] = $('.uni-sidebar-box').map((index, element) => {
        const $element = $(element);
        return {
          title: $element.find('h3').text().trim(),
          content: $element.find('ul li').map((i, li) => $(li).text().trim()).get()
        };
      }).get();
  
      // Extract data from div.col-md-9.md-1 inside the container
      const mainContentData: MainContentItem[] = $('.container .col-md-9.md-1').map((index, element) => {
        const $element = $(element);
        return {
          title: $element.find('h1, h2, h3, h4').first().text().trim(),
          paragraphs: $element.find('p').map((i, p) => $(p).text().trim()).get(),
          lists: $element.find('ul, ol').map((i, list) => {
            return {
              type: list.name,
              items: $(list).find('li, table').first().map((j, li) => $(li).text().trim()).get()
            };
          }).get()
        };
      }).get();
  
      return {
        sidebar: sidebarData,
        mainContent: mainContentData
      };
      
    } catch (error) {
      console.error('Error scraping webpage:', error);
      throw error;
    }
  }