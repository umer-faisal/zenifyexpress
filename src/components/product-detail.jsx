"use client"

import { useState } from "react"
import { useCart } from "../contexts/cart-context"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock product data - in a real app this would come from an API
const getProductById = (id) => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      originalPrice: 129.99,
      images: ["/wireless-headphones.png"],
      rating: 4.5,
      reviews: 128,
      category: "Electronics",
      inStock: true,
      stockCount: 15,
      description:
        "Premium wireless headphones with active noise cancellation technology. Experience crystal-clear audio quality with deep bass and crisp highs. Perfect for music lovers, commuters, and professionals.",
      features: [
        "Active Noise Cancellation",
        "30-hour battery life",
        "Quick charge: 5 min = 2 hours",
        "Bluetooth 5.0 connectivity",
        "Premium leather ear cushions",
        "Built-in microphone for calls",
      ],
      specifications: {
        "Driver Size": "40mm",
        "Frequency Response": "20Hz - 20kHz",
        Impedance: "32 ohms",
        Weight: "250g",
        Connectivity: "Bluetooth 5.0, 3.5mm jack",
        Battery: "30 hours playback",
      },
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      originalPrice: 249.99,
      images: ["/smartwatch-lifestyle.png"],
      rating: 4.8,
      reviews: 89,
      category: "Electronics",
      inStock: true,
      stockCount: 25,
      description:
        "Advanced fitness tracking and smart notifications at your wrist. Track your health metrics, receive notifications, and stay connected throughout your day with this stylish smartwatch.",
      features: [
        "Heart rate monitoring",
        "Sleep tracking",
        "50+ sport modes",
        "Water resistant (5ATM)",
        "7-day battery life",
        "Smart notifications",
      ],
      specifications: {
        Display: "1.4 inch AMOLED",
        Resolution: "454 x 454 pixels",
        Battery: "7 days typical use",
        Weight: "45g",
        Connectivity: "Bluetooth 5.0",
        Compatibility: "iOS & Android",
      },
    },
    {
      id: 3,
      name: "Laptop Backpack",
      price: 49.99,
      originalPrice: 69.99,
      images: ["/laptop-backpack.png"],
      rating: 4.3,
      reviews: 156,
      category: "Accessories",
      inStock: true,
      stockCount: 30,
      description:
        "Durable laptop backpack with multiple compartments for organization. Perfect for students and professionals who need to carry their tech safely and stylishly.",
      features: [
        "Fits 15.6 inch laptops",
        "Water-resistant material",
        "Multiple compartments",
        "Padded shoulder straps",
        "USB charging port",
        "Anti-theft back pocket",
      ],
      specifications: {
        Material: "Water-resistant polyester",
        Capacity: "30 liters",
        Dimensions: "18 x 12 x 8 inches",
        Weight: "1.2 kg",
        "Laptop Compartment": "Up to 15.6 inches",
        Color: "Black",
      },
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      originalPrice: 99.99,
      images: ["/bluetooth-speaker.png"],
      rating: 4.6,
      reviews: 203,
      category: "Electronics",
      inStock: true,
      stockCount: 18,
      description:
        "Portable speaker with rich, clear sound and powerful bass. Take your music anywhere with this waterproof, durable speaker that delivers exceptional audio quality.",
      features: [
        "360° sound output",
        "20-hour battery life",
        "Waterproof (IPX7)",
        "Wireless stereo pairing",
        "Built-in microphone",
        "Compact and portable",
      ],
      specifications: {
        "Power Output": "20W",
        "Battery Life": "20 hours",
        "Charging Time": "3.5 hours",
        Weight: "600g",
        Connectivity: "Bluetooth 5.0",
        "Water Rating": "IPX7",
      },
    },
    {
      id: 5,
      name: "Gaming Mouse",
      price: 59.99,
      originalPrice: 79.99,
      images: ["/gaming-mouse.png"],
      rating: 4.7,
      reviews: 94,
      category: "Electronics",
      inStock: true,
      stockCount: 22,
      description:
        "High-precision gaming mouse with RGB lighting and customizable buttons. Engineered for gamers who demand accuracy, speed, and style in every move.",
      features: [
        "16,000 DPI sensor",
        "RGB lighting",
        "8 programmable buttons",
        "Ergonomic design",
        "Braided cable",
        "On-the-fly DPI switching",
      ],
      specifications: {
        Sensor: "Optical",
        "Max DPI": "16,000",
        "Polling Rate": "1000 Hz",
        Weight: "95g",
        Cable: "1.8m braided",
        Compatibility: "Windows, macOS",
      },
    },
    {
      id: 6,
      name: "Yoga Mat",
      price: 29.99,
      originalPrice: 39.99,
      images: ["/rolled-yoga-mat.png"],
      rating: 4.4,
      reviews: 167,
      category: "Fitness",
      inStock: true,
      stockCount: 40,
      description:
        "Non-slip yoga mat for all types of workouts. Made from eco-friendly materials, this mat provides excellent cushioning and grip for your yoga and fitness routines.",
      features: [
        "Non-slip surface",
        "Eco-friendly TPE material",
        "6mm thick cushioning",
        "Lightweight and portable",
        "Easy to clean",
        "Comes with carrying strap",
      ],
      specifications: {
        Material: "TPE (Thermoplastic Elastomer)",
        Thickness: "6mm",
        Dimensions: "72 x 24 inches",
        Weight: "1 kg",
        Color: "Purple",
        Care: "Wipe clean",
      },
    },
    {
      id: 7,
      name: "Coffee Maker",
      price: 149.99,
      originalPrice: 199.99,
      images: ["/modern-coffee-maker.png"],
      rating: 4.2,
      reviews: 78,
      category: "Home",
      inStock: true,
      stockCount: 12,
      description:
        "Programmable coffee maker with thermal carafe. Brew perfect coffee every morning with this easy-to-use, feature-rich coffee maker that keeps your coffee hot for hours.",
      features: [
        "12-cup capacity",
        "Programmable 24-hour timer",
        "Thermal carafe",
        "Brew strength control",
        "Auto shut-off",
        "Removable filter basket",
      ],
      specifications: {
        Capacity: "12 cups (1.8 liters)",
        Type: "Drip coffee maker",
        Power: "900W",
        Dimensions: "10 x 8 x 14 inches",
        Weight: "2.5 kg",
        Color: "Stainless steel",
      },
    },
    {
      id: 8,
      name: "Running Shoes",
      price: 89.99,
      originalPrice: 119.99,
      images: ["/running-shoes-on-track.png"],
      rating: 4.6,
      reviews: 234,
      category: "Fashion",
      inStock: true,
      stockCount: 35,
      description:
        "Lightweight running shoes with superior comfort and cushioning. Designed for runners who want the perfect combination of support, breathability, and style.",
      features: [
        "Breathable mesh upper",
        "Responsive cushioning",
        "Durable rubber outsole",
        "Lightweight design",
        "Arch support",
        "Available in multiple sizes",
      ],
      specifications: {
        Material: "Mesh and synthetic",
        Weight: "250g per shoe",
        "Sole Material": "Rubber",
        Type: "Road running",
        Sizes: "US 7-13",
        Color: "Blue/White",
      },
    },
  ]

  return products.find((p) => p.id === Number.parseInt(id)) || products[0]
}

export default function ProductDetail({ productId }) {
  const product = getProductById(productId)
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stockCount, prev + change)))
  }

  const handleAddToCart = async () => {
    setIsAdding(true)
    addItem(product, quantity)

    // Simulate loading state
    setTimeout(() => {
      setIsAdding(false)
    }, 500)
  }

  const discountPercentage =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-card">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl font-bold text-foreground">Rs {product.price}</span>
              {discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">Rs {product.originalPrice}</span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {discountPercentage}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600">In Stock ({product.stockCount} available)</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-red-600">Out of Stock</span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button className="flex-1" size="lg" disabled={!product.inStock || isAdding} onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAdding ? "Adding..." : `Add to Cart - Rs ${(product.price * quantity).toFixed(2)}`}
              </Button>
              <Button variant="outline" size="lg" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-red-500" : ""}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over Rs 50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">2 Year Warranty</p>
                    <p className="text-xs text-muted-foreground">Full manufacturer warranty</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">30-Day Returns</p>
                    <p className="text-xs text-muted-foreground">Easy returns and exchanges</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 border-primary text-primary font-medium">Description</button>
            <button className="py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Specifications
            </button>
            <button className="py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground">
              Reviews ({product.reviews})
            </button>
          </nav>
        </div>

        <div className="py-8">
          <div className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <h4 className="font-semibold text-foreground mb-4">Specifications</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-foreground">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
