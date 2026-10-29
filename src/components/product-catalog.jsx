"use client"

import { useState } from "react"
import { useCart } from "../contexts/cart-context"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Badge } from "../components/ui/badge"
import { Star, ShoppingCart, Filter, Search } from "lucide-react"
import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 129.99,
    image: "/wireless-headphones.png",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
    description: "Premium wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "/smartwatch-lifestyle.png",
    rating: 4.8,
    reviews: 89,
    category: "Electronics",
    inStock: true,
    description: "Advanced fitness tracking and smart notifications",
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    originalPrice: 69.99,
    image: "/laptop-backpack.png",
    rating: 4.3,
    reviews: 156,
    category: "Accessories",
    inStock: true,
    description: "Durable laptop backpack with multiple compartments",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    image: "/bluetooth-speaker.png",
    rating: 4.6,
    reviews: 203,
    category: "Electronics",
    inStock: false,
    description: "Portable speaker with rich, clear sound",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    price: 59.99,
    originalPrice: 79.99,
    image: "/gaming-mouse.png",
    rating: 4.7,
    reviews: 94,
    category: "Electronics",
    inStock: true,
    description: "High-precision gaming mouse with RGB lighting",
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: 29.99,
    originalPrice: 39.99,
    image: "/rolled-yoga-mat.png",
    rating: 4.4,
    reviews: 167,
    category: "Fitness",
    inStock: true,
    description: "Non-slip yoga mat for all types of workouts",
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 149.99,
    originalPrice: 199.99,
    image: "/modern-coffee-maker.png",
    rating: 4.2,
    reviews: 78,
    category: "Home",
    inStock: true,
    description: "Programmable coffee maker with thermal carafe",
  },
  {
    id: 8,
    name: "Running Shoes",
    price: 89.99,
    originalPrice: 119.99,
    image: "/running-shoes-on-track.png",
    rating: 4.6,
    reviews: 234,
    category: "Fashion",
    inStock: true,
    description: "Lightweight running shoes with superior comfort",
  },
]

const categories = ["All", "Electronics", "Accessories", "Fitness", "Home", "Fashion"]

export default function ProductCatalog() {
  const { addItem } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [addingItems, setAddingItems] = useState({})

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleAddToCart = async (product) => {
    setAddingItems((prev) => ({ ...prev, [product.id]: true }))
    addItem(product, 1)

    // Simulate loading state
    setTimeout(() => {
      setAddingItems((prev) => ({ ...prev, [product.id]: false }))
    }, 500)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground">Discover our complete collection of quality products</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Toggle */}
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
            {/* <Select value={sortBy} onValueChange={setSortBy}> */} {/* TODO: Add Select */}
              {/* <SelectTrigger className="w-full sm:w-48"> */}
            {/*   <SelectValue placeholder="Sort by" /> */}
            {/* </SelectTrigger> */}
            {/* <SelectContent> */}
                {/* <SelectItem value="featured">Featured</SelectItem> */}
                {/* <SelectItem value="price-low">Price: Low to High</SelectItem> */}
                {/* <SelectItem value="price-high">Price: High to Low</SelectItem> */}
                {/* <SelectItem value="rating">Highest Rated</SelectItem> */}
                {/* <SelectItem value="name">Name A-Z</SelectItem> */}
              {/* </SelectContent> */}
            {/* </Select> */}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Showing {sortedProducts.length} of {allProducts.length} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden rounded-t-lg cursor-pointer">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice > product.price && (
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        Sale
                      </Badge>
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-foreground">Rs {product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">Rs {product.originalPrice}</span>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <Button
                  className="w-full"
                  size="sm"
                  disabled={!product.inStock || addingItems[product.id]}
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {addingItems[product.id] ? "Adding..." : product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          <Button
            variant="outline"
            className="mt-4 bg-transparent"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
