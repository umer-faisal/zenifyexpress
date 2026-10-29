"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import { useSelector } from "react-redux";
import {
  createCategory as createCategoryApi,
  getCategories as getCategoriesApi,
} from "../lib/categories";

const CategoryContext = createContext();
console.log("🚀 ~ CategoryContext:", CategoryContext)

export function CategoryProvider({ children }) {
  const user = useSelector((state) => state.auth.user);
  // const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // optional: pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // agar backend meta deta ho:
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Check if user is admin
  const isAdmin = user?.role === "admin";

  // Fetch categories from API
  const fetchCategories = async ({ page: p = page, limit: l = limit } = {}) => {
    setLoading(true);
    setError(null);
    try {
      // yahan backend response ke hisaab se adjust karo
      // Example:
      // { success:true, data:{ categories:[...], total, page, totalPages } }
      const res = await getCategoriesApi({ page: p, limit: l });
      const payload = res?.data ?? {};
      let list = [];

      // ✅ agar data pura-pura array hai
      if (Array.isArray(payload)) {
        list = payload;
      }
      // ✅ agar data.categories array hai
      else if (Array.isArray(payload.categories)) {
        list = payload.categories;
      }
      // ✅ agar data.data array ho (kuch APIs aise karti hain)
      else if (Array.isArray(payload.data)) {
        list = payload.data;
      }
      // warna empty array hi rehne do

      console.log("👉 categories list after parsing:", list);
      setCategories(list);
      // optional meta
      if (typeof payload.total === "number") setTotal(payload.total);
      if (typeof payload.page === "number") setPage(payload.page);
      if (typeof payload.totalPages === "number")
        setTotalPages(payload.totalPages);
      setLimit(l);
    } catch (err) {
      console.error("fetchCategories error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get categories based on user role
  const getCategories = () => {
    // agar kisi wajah se categories array na ho to crash na kare
    if (!Array.isArray(categories)) {
      return [];
    }

    // Filter only active categories (isActive !== false)
    const activeCategories = categories.filter(
      (cat) => cat.isActive !== false
    );

    if (isAdmin) {
      return activeCategories;
    } else {
      // Non-admin users ko bhi saari active categories dikhani chahiye
      return activeCategories;
    }
  };

  // Admin functions
  const createCategory = async (categoryData) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    setLoading(true);
    setError(null);
    try {
      const res = await createCategoryApi(categoryData);

      const newCategory = res?.data?.category || res?.data || categoryData;

      setCategories((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      console.log("🚀 ~ createCategory ~ err:", err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      return updatedCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deactivateCategory = async (id) => {
    if (!isAdmin) {
      throw new Error("Unauthorized: Admin access required");
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to deactivate category");
      }

      const updatedCategory = await response.json();
      setCategories((prev) =>
        prev.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      return updatedCategory;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const value = {
    categories: getCategories(),
    allCategories: categories, // Admin can access all categories
    loading,
    error,
    isAdmin,
    createCategory,
    updateCategory,
    deactivateCategory,
    fetchCategories,
    page,
    limit,
    total,
    totalPages,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoryProvider");
  }
  return context;
}
