"Use client"

import ClientLayout from "./client-layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"




export const metadata = {
  title: "ShopHub - Your Online Store",
  description: "Discover amazing products at great prices",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          <ClientLayout>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </ClientLayout>
      </body>
    </html>
  )
}
