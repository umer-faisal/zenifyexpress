"Use client"
import AdminCategoryManagement from "../../../components/admin-category-management"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import ProtectedRoute from "../../../components/protected-route"

export default function AdminCategoriesPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <AdminCategoryManagement />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
