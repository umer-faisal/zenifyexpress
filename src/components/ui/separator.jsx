import React from "react"

export function Separator({ className = "", ...props }) {
  return (
    <hr
      className={`border-t border-border my-4 ${className}`}
      {...props}
    />
  )
}
