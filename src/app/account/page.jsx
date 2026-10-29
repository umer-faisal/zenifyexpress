"Use client"

import AccountPage from "../../components/account-page"
import Header from "../../components/header"
import Footer from "../../components/footer"
import ProtectedRoute from "../../components/protected-route"

export default function Account() {
  return (
    <ProtectedRoute requiredRole="user">
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AccountPage />
      </main>
      <Footer />
    </div>
    </ProtectedRoute>
  )
}
