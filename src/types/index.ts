export interface SidebarItem {
  title: string;
  content: string[];
}

type TContent = { title: string; desc: string };

export interface UniversityItem {
  school: TContent;
  country: TContent;
  city: TContent;
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
  university: UniversityItem;
  mainContent: MainContentItem[];
}
