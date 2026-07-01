export interface ChecklistItem {
  id: string;
  categoryId: string;
  name: string;
  quantity: number;
  checked: boolean;
  note: string;
  sort_order: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  items: ChecklistItem[];
}

export interface ChecklistData {
  categories: Category[];
}
