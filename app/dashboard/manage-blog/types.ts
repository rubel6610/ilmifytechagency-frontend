export interface Blog {
  id: string;
  title: string;
  subTitle: string;
  des: string;
  images: string[];
  active: boolean;
  views: number;
  adminId?: string;
  createdAt?: string;
  updatedAt?: string;
  admin?: {
    id: string;
    name: string;
    photo: string | null;
  };
}

export interface BlogFormData {
  title: string;
  subTitle: string;
  des: string;
  active: boolean;
  images?: FileList;
}
