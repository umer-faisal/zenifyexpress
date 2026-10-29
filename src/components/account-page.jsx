"use client"
import { useAuth } from "../contexts/auth-context"
import { useCart } from "../contexts/cart-context"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { User, ShoppingBag, Heart, Settings, LogOut, Package } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout as logoutRedux } from "../lib/redux/authSlice"

export default function AccountPage() {
  const { user, email, isLoggedIn, role } = useSelector((state) => state.auth);
  console.log("🚀 ~ AccountPage ~ user, email, isLoggedIn, role :", user, email, isLoggedIn, role )
  const { logout, loading } = useAuth()
  const { getItemCount, getTotal } = useCart()
  const router = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && (!isLoggedIn || role === "admin")) {
      router.push("/admin")
    }
  }, [isLoggedIn, loading, router, role])

  console.log("🚀 ~ AccountPage ~ loading:", loading)
  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">Loading...</div>
      </div>
    )
  }
  
  // console.log("🚀 ~ AccountPage ~ isLoggedIn:", isLoggedIn)
  // if (!isLoggedIn) {
  //   return <p className="p-4">Please login to view your account.</p>;
  // }

  console.log("🚀 ~ AccountPage ~ user:", user)
  if (!user) {
    return null
  }

  const handleLogout = () => {
    logout()
    dispatch(logoutRedux())
    router.push("/")
  }

  const cartItemCount = getItemCount()
  const cartTotal = getTotal()

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <CardTitle>{user.name || "User"}</CardTitle>
                <CardDescription>{user.email || email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{cartItemCount}</div>
                  <p className="text-sm text-muted-foreground">Items in Cart</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-sm text-muted-foreground">Wishlist Items</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Cart */}
            {cartItemCount > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Cart</CardTitle>
                  <CardDescription>You have {cartItemCount} items in your cart</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total: ${cartTotal.toFixed(2)}</span>
                    <Badge variant="secondary">{cartItemCount} items</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button asChild className="flex-1">
                      <a href="/cart">View Cart</a>
                    </Button>
                    <Button variant="outline" asChild className="flex-1 bg-transparent">
                      <a href="/checkout">Checkout</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your order history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                  <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                  <Button asChild>
                    <a href="/products">Browse Products</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Shipping Address</h4>
                    <p className="text-sm text-muted-foreground">Default delivery address</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Address
                  </Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Payment Methods</h4>
                    <p className="text-sm text-muted-foreground">Saved payment options</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Add Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
