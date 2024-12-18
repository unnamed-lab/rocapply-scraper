
export interface SidebarItem {
  title: string;
  content: string[];
}

export interface ListItem {
  type: string;
  items: string[];
}

export interface MainContentItem {
  title: string;
  paragraphs: string[];
  lists: ListItem[];
}

export interface ScrapedData {
  sidebar: SidebarItem[];
  mainContent: MainContentItem[];
}
