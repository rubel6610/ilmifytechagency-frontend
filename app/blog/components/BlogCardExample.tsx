// Example: How to use BlogCard component in HomePage or any other component

import { useGetBlogsQuery } from "@/redux/service/blogApi";
import BlogCard from "@/app/blog/components/BlogCard";

// Example 1: Show latest 3 blogs in homepage
export function HomePageBlogSection() {
  const { data: blogResponse, isLoading } = useGetBlogsQuery({
    page: 1,
    limit: 3,
  });

  const blogs = blogResponse?.data?.blogs || [];

  if (isLoading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Latest Articles</h2>
      <BlogCard 
        blogs={blogs}
        showAnimation={true}
        gridCols="3"
        maxBlogs={3}
      />
    </section>
  );
}

// Example 2: Show 6 blogs without animation
export function SimpleBlogs() {
  const { data: blogResponse } = useGetBlogsQuery({
    page: 1,
    limit: 6,
  });

  const blogs = blogResponse?.data?.blogs || [];

  return (
    <BlogCard 
      blogs={blogs}
      showAnimation={false}
      gridCols="2"
    />
  );
}

// Example 3: Show single column layout
export function SingleColumnBlogs() {
  const { data: blogResponse } = useGetBlogsQuery({
    page: 1,
    limit: 5,
  });

  const blogs = blogResponse?.data?.blogs || [];

  return (
    <BlogCard 
      blogs={blogs}
      showAnimation={true}
      gridCols="1"
      maxBlogs={5}
    />
  );
}
