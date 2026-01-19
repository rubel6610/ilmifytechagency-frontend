import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { role } from "../../page";

export const useBlogLogic = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editBlog, setEditBlog] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);
  const itemsPerPage = 8;

  // Fetch Data
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/blogs.json");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // React Hook Form
  const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm();

  // Handlers
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  const onAddSubmit = async (data) => {
    if (!data.photo) {
      setError("photo", { type: "manual", message: "Please upload an image" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", data.photo);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, { 
        method: "POST", body: formData 
      });
      const imgData = await response.json();

      if (imgData.success) {
        const newBlog = {
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
    register, handleSubmit, setValue, setError, clearErrors, reset, errors, onAddSubmit, handleDelete
  };
};