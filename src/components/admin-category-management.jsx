"use client";

import { useState } from "react";
import { useCategories } from "../contexts/category-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Clock, Calendar } from "lucide-react";
import { toast } from "react-toastify"

export default function AdminCategoryManagement() {
  const { allCategories, loading, error, updateCategory, deactivateCategory, createCategory, } =
    useCategories();

  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const STATIC_ICON_URL = "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg";

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryTitle.trim()) return;

    try {
      setIsSaving(true);

      await createCategory({
        title: newCategoryTitle.trim(),
        description: newCategoryDescription.trim() || "",
        icon: newCategoryIcon.trim() || STATIC_ICON_URL,
      });

      setNewCategoryTitle("");
      setNewCategoryDescription("");
      setNewCategoryIcon("");
      setIsCreating(false);
      toast.success("Category created successfully");
    } catch (err) {
      console.log("🚀 ~ handleCreateCategory ~ err:", err)
      toast.error(err?.message || "Failed to create category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartEdit = (category) => {
    setEditingId(category.id);
    setEditTitle(category.title || category.name || "");
    setEditDescription(category.description || "");
    setEditIcon(category.icon || "");
  };

  const handleSaveEdit = async (id) => {
    if (!editTitle.trim()) return;

    try {
      await updateCategory(id, {
        title: editTitle.trim(),
        description: editDescription.trim() || "",
        icon: editIcon.trim() || "",
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      setEditIcon("");
      toast.success("Category updated successfully");
    } catch (err) {
      console.error("Failed to update category:", err);
      toast.error(err?.message || "Failed to update category");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditIcon("");
  };

  const handleDeactivateCategory = async (id) => {
    if (confirm("Are you sure you want to deactivate this category?")) {
      try {
        await deactivateCategory(id);
      } catch (err) {
        console.error("Failed to deactivate category:", err);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Category Management
              <Badge variant="secondary">Admin Only</Badge>
            </CardTitle>
            <CardDescription>
              Manage product categories. Users will only see the last 2
              categories.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Create New Category */}
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">
                Create New Category
              </h3>
              {!isCreating ? (
                <Button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              ) : (
                <form
                  onSubmit={handleCreateCategory}
                  className="flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Title */}
                    <div className="flex-1">
                      <Label htmlFor="newCategoryTitle">Category Title *</Label>
                      <Input
                        id="newCategoryTitle"
                        value={newCategoryTitle}
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                        placeholder="Enter category title"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="flex-1">
                      <Label htmlFor="newCategoryDescription">
                        Description
                      </Label>
                      <Input
                        id="newCategoryDescription"
                        value={newCategoryDescription}
                        onChange={(e) =>
                          setNewCategoryDescription(e.target.value)
                        }
                        placeholder="Enter category description"
                      />
                    </div>

                    {/* Icon URL */}
                    <div className="flex-1">
                      <Label htmlFor="newCategoryIcon">Icon URL</Label>
                      <Input
                        id="newCategoryIcon"
                        type="url"
                        value={newCategoryIcon}
                        onChange={(e) => setNewCategoryIcon(e.target.value)}
                        placeholder="Enter icon URL"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-end justify-end">
                    <Button type="submit" disabled={isSaving || loading}>
                      <Save className="h-4 w-4 mr-2" />
                      {isSaving ? "Saving..." : "Save"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreating(false);
                        setNewCategoryTitle("");
                        setNewCategoryDescription("");
                        setNewCategoryIcon("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Categories List */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                All Categories ({allCategories.length})
              </h3>
              <div className="space-y-4">
                {allCategories?.map((category) => (
                  <div
                    key={category.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    {editingId === category.id ? (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <Label>Title *</Label>
                            <Input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              placeholder="Category title"
                            />
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Input
                              value={editDescription}
                              onChange={(e) => setEditDescription(e.target.value)}
                              placeholder="Category description"
                            />
                          </div>
                          <div>
                            <Label>Icon URL</Label>
                            <Input
                              value={editIcon}
                              onChange={(e) => setEditIcon(e.target.value)}
                              placeholder="Icon URL"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveEdit(category.id)}
                            disabled={loading}
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                              {category.icon && (
                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                                  <img
                                    src={category.icon}
                                    alt={category.title || category.name || "Category"}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display = "flex";
                                    }}
                                  />
                                  <div className="hidden w-full h-full items-center justify-center">
                                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-lg">
                                    {category.title || category.name || "Untitled"}
                                  </span>
                                  <Badge
                                    variant={
                                      category.isActive !== false ? "default" : "secondary"
                                    }
                                  >
                                    {category.isActive !== false ? "Active" : "Inactive"}
                                  </Badge>
                                </div>
                                {category.description && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {category.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
                              {category.createdAt && (
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>Created: {formatDate(category.createdAt)}</span>
                                </div>
                              )}
                              {category.updatedAt && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Updated: {formatDate(category.updatedAt)}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStartEdit(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeactivateCategory(category.id)}
                              disabled={loading}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* User View Preview */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="text-lg font-semibold mb-4">User View Preview</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Users will only see the last 2 categories:
              </p>
              <div className="flex gap-2">
                {allCategories.slice(-2).map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.title || category.name || "Untitled"}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
