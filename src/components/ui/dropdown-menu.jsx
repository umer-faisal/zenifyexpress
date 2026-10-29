"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuContent = React.forwardRef(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Content ref={ref} {...props}>
      {children}
    </DropdownMenuPrimitive.Content>
  )
)
export const DropdownMenuItem = React.forwardRef(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Item ref={ref} {...props}>
      {children}
    </DropdownMenuPrimitive.Item>
  )
)
export const DropdownMenuLabel = React.forwardRef(
  ({ children, ...props }, ref) => (
    <DropdownMenuPrimitive.Label ref={ref} {...props}>
      {children}
    </DropdownMenuPrimitive.Label>
  )
)
export const DropdownMenuSeparator = DropdownMenuPrimitive.Separator
