type TContent = { title: string; desc: string };

export type TableRow = { [key: string]: string };
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

export interface ScrapedData {
  university: UniversityItem;
  program: ProgramItem;
}
