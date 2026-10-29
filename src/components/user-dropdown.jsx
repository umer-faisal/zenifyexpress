"use client"

import { useAuth } from "../contexts/auth-context"
import { Button } from "./ui/button"
import { User, Settings } from "lucide-react"
import Link from "next/link"

export default function UserDropdown() {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <Button variant="ghost" size="icon" asChild>
        <Link href="/login">
          <User className="h-5 w-5 text-white" />
        </Link>
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Admin Panel Link */}
      {user.role === 'admin' && (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/categories" title="Admin Panel">
            <Settings className="h-5 w-5 text-white" />
          </Link>
        </Button>
      )}
      
      {/* User Account Link */}
      <Button variant="ghost" size="icon" asChild>
        <Link href="/account">
          <User className="h-5 w-5 text-white" />
        </Link>
      </Button>
    </div>
  )
}
