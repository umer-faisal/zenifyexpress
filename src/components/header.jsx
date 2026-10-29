"use client"
import { Search, Menu } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useSelector } from "react-redux"
import CartDrawer from "../components/cart-drawer"
import UserDropdown from "../components/user-dropdown"
import Link from "next/link"

export default function Header() {

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-white cursor-pointer">Zenify Express</h1>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-10 w-full" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-sm font-medium hover:text-shadow-white text-white">
              All Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-shadow-white text-white">
              Categories
            </Link>
            <a href="#" className="text-sm font-medium hover:text-shadow-white text-white">
              Deals
            </a>
            <a href="#" className="text-sm font-medium hover:text-shadow-white text-white">
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile search button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
           
           {isLoggedIn && user ? (
            <UserDropdown user={user}/>
            ) : (
            <Link href="/login">
                <Button variant="outline" className="bg-transparent text-white border-white">
                  Login
                </Button>
            </Link>
            )}
            <CartDrawer />

            {/* Mobile menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
