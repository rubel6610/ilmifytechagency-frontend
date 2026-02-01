import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Blog, BlogFormData } from "../types";
import { fakeBlogs } from "../fakeData";

export const useBlogLogic = () => {
  const [blogToDelete, setBlogToDelete] = useState<number | string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const itemsPerPage = 8;

  const role = "Admin"; // Hardcoded for now based on previous code context

  // Fetch Data (Now uses fake data)
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Simulating API fetch with fake data
        await new Promise((resolve) => setTimeout(resolve, 800));
        setBlogs(fakeBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // React Hook Form
  const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm<BlogFormData>();

  const openDeleteModal = (id: number | string) => {
    setBlogToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete));
      setIsDeleteModalOpen(false);
      setBlogToDelete(null);
    }
  };

  const onAddSubmit = async (data: BlogFormData) => {
    if (!data.photo || data.photo.length === 0) {
      setError("photo", { type: "manual", message: "Please upload an image" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.photo[0]);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, { 
        method: "POST", body: formData 
      });
      const imgData = await response.json();

      if (imgData.success) {
        const newBlog: Blog = {
          id: Date.now(),
          title: data.title,
          bussiness: data.category,
          description: data.content,
          image: imgData.data.url,
          author: role,
          date: new Date().toLocaleDateString("en-GB"),
        };
        setBlogs([newBlog, ...blogs]);
        setIsAddModalOpen(false);
        reset();
        setPreview(null);
        alert("Blog post created successfully!");
      }
    } catch (error) {
      alert("Upload failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = (data: any) => {
    // This was missing from original useBlogLogic return but used in page.jsx
    console.log("Edit submit:", data);
    setEditBlog(null);
  };

  // Filter & Pagination Logic
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    blogs, setBlogs, loading, searchQuery, setSearchQuery, currentPage, setCurrentPage,
    selectedBlog, setSelectedBlog, editBlog, setEditBlog, isAddModalOpen, setIsAddModalOpen,
    isSubmitting, preview, setPreview, itemsPerPage, currentBlogs, totalPages, filteredBlogs,
    register, handleSubmit, setValue, setError, clearErrors, reset, errors, onAddSubmit, handleEditSubmit, isDeleteModalOpen, setIsDeleteModalOpen, openDeleteModal, confirmDelete
  };
};
