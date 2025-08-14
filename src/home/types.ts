export interface CheckItem {
  id: string;
  item: string;
  result?: string;
}

export interface InspectionSection {
  id: string;
  title: string;
  items?: CheckItem[];
}
