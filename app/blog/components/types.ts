import { Blog } from "@/redux/service/blogApi";

// Blog component types
export interface BlogCardProps {
  blogs: Blog[];
  showAnimation?: boolean;
  gridCols?: "1" | "2" | "3";
  maxBlogs?: number;
}

// Re-export Blog type from API for convenience
export type { Blog } from "@/redux/service/blogApi";
