export interface Category {
  _id: string;
  name: string;
  description?: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  classLevel: string;
  fees: number;
  duration?: string;
  category: Category;
}