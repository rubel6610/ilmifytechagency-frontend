import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Blog, BlogFormData } from "../types";
import { 
  useGetBlogsQuery, 
  useCreateBlogMutation, 
  useUpdateBlogMutation, 
  useDeleteBlogMutation 
} from "@/redux/service/blogApi";
import Swal from "sweetalert2";

export const useBlogLogic = () => {
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const itemsPerPage = 8;

  // API Hooks
  const { data: blogResponse, isLoading, refetch } = useGetBlogsQuery({ 
    page: currentPage, 
    limit: itemsPerPage 
  });
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = blogResponse?.data?.blogs || [];
  const totalPages = blogResponse?.data?.totalPages || 0;

  // React Hook Form
  const { register, handleSubmit, setValue, setError, clearErrors, reset, formState: { errors } } = useForm<BlogFormData>();

  const openDeleteModal = (id: string) => {
    setBlogToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (blogToDelete) {
      try {
        const res = await deleteBlog(blogToDelete).unwrap();
        if (res.status) {
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
          refetch();
        }
      } catch (error) {
        Swal.fire("Error", "Failed to delete blog.", "error");
      } finally {
        setIsDeleteModalOpen(false);
        setBlogToDelete(null);
      }
    }
  };

  const onAddSubmit = async (data: BlogFormData) => {
    try {
      const formData = new FormData();
      const blogData = {
        title: data.title,
        subTitle: data.subTitle,
        des: data.des,
        active: data.active,
      };

      formData.append("data", JSON.stringify(blogData));
      
      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      const res = await createBlog(formData).unwrap();
      if (res.status) {
        Swal.fire("Success", "Blog created successfully!", "success");
        setIsAddModalOpen(false);
        reset();
        setPreview(null);
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to create blog.", "error");
    }
  };

  const onEditSubmit = async (data: BlogFormData) => {
    if (!editBlog) return;
    try {
      const formData = new FormData();
      const blogData = {
        title: data.title,
        subTitle: data.subTitle,
        des: data.des,
        active: data.active,
      };

      formData.append("data", JSON.stringify(blogData));
      
      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      const res = await updateBlog({ id: editBlog.id, formData }).unwrap();
      if (res.status) {
        Swal.fire("Success", "Blog updated successfully!", "success");
        setEditBlog(null);
        reset();
        setPreview(null);
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update blog.", "error");
    }
  };

  // Filter Logic (Note: Backend pagination is used, but we can still filter on the current page for instant feedback)
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    blogs: filteredBlogs,
    loading: isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    selectedBlog,
    setSelectedBlog,
    editBlog,
    setEditBlog,
    isAddModalOpen,
    setIsAddModalOpen,
    isSubmitting: isCreating || isUpdating,
    preview,
    setPreview,
    itemsPerPage,
    totalPages,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    errors,
    onAddSubmit,
    onEditSubmit,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    openDeleteModal,
    confirmDelete,
  };
};
