export interface Blog {
  id: number | string;
  title: string;
  bussiness: string; // The UI uses 'category' but the data uses 'bussiness'
  description: string;
  image: string;
  author: string;
  date: string;
}

export interface BlogFormData {
  title: string;
  category: string;
  content: string;
  photo?: FileList;
}
