"use client"

import { useCategories } from "../contexts/category-context"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ShoppingBag, Image as ImageIcon } from "lucide-react"

export default function UserCategoryDisplay() {
  const { categories, loading, error } = useCategories()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">Loading categories...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-red-600">Error loading categories: {error}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Browse Categories
            </CardTitle>
            <CardDescription>
              Explore our product categories ({categories.length} available)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-5 border rounded-lg hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer group"
                >
                  {/* Icon */}
                  {category.icon && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <img
                        src={category.icon}
                        alt={category.title || category.name || "Category"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                      <div className="hidden w-full h-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                  
                  {/* Title and Status */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      {category.title || category.name || "Untitled Category"}
                    </h3>
                    {category.isActive !== false && (
                      <Badge variant="default" className="ml-2">Active</Badge>
                    )}
                  </div>
                  
                  {/* Description */}
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                  
                  {!category.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Browse products in this category
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            {categories.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No categories available at the moment.</p>
                <p className="text-sm mt-2">Check back later for new categories.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
