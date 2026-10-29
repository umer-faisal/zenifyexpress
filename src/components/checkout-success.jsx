"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { CheckCircle, Package, ArrowRight, Home, Receipt } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccess() {
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderNumber(randomOrderNumber)
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        {/* Order Details Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Receipt className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="text-xl font-bold text-primary">{orderNumber}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                <p className="font-semibold">3-5 Business Days</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Tracking Available</p>
                <p className="font-semibold">Within 24 Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              What's Next?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <h4 className="font-semibold">Order Confirmation</h4>
                <p className="text-sm text-muted-foreground">
                  You'll receive an email confirmation with your order details shortly.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Processing</h4>
                <p className="text-sm text-muted-foreground">
                  We'll prepare your order for shipment within 1-2 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  Your order will be shipped and you'll receive tracking information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/account">
              <Package className="h-4 w-4 mr-2" />
              View Order Status
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="/products">
              Continue Shopping
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Support */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="font-semibold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you have any questions about your order, our customer support team is here to help.
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>

        {/* Back to Home */}
        <div className="mt-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
