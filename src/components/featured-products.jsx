"use client"

import { useCart } from "../contexts/cart-context"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    originalPrice: 129.99,
    image: "/wireless-headphones.png",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    image: "/smartwatch-lifestyle.png",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Laptop Backpack",
    price: 49.99,
    originalPrice: 69.99,
    image: "/laptop-backpack.png",
    rating: 4.3,
    reviews: 156,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    image: "/bluetooth-speaker.png",
    rating: 4.6,
    reviews: 203,
  },
]

export default function FeaturedProducts() {
  const { addItem } = useCart()
  const [addingItems, setAddingItems] = useState({})

  const handleAddToCart = async (product) => {
    setAddingItems((prev) => ({ ...prev, [product.id]: true }))
    addItem(product, 1)

    // Simulate loading state
    setTimeout(() => {
      setAddingItems((prev) => ({ ...prev, [product.id]: false }))
    }, 500)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the best products with amazing deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden rounded-t-lg cursor-pointer">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">Sale</span>
                    </div>
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

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
                      <span className="text-sm text-muted-foreground line-through">Rs {product.originalPrice}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="sm"
                    disabled={addingItems[product.id]}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {addingItems[product.id] ? "Adding..." : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
