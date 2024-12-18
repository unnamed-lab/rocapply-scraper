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

export interface ProgramItem {
  title: string;
  university: string;
  details: Record<string, string>;
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
  program: ProgramItem;
  mainContent: MainContentItem[];
}
