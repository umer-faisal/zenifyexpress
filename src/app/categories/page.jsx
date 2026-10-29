import UserCategoryDisplay from "../../components/user-category-display"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <UserCategoryDisplay />
      </main>
      <Footer />
    </div>
  )
}
