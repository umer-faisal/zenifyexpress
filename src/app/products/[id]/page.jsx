import ProductDetail from "../../../components/product-detail"
import Header from "../../../components/header"
import Footer from "../../../components/footer"

export default function ProductDetailPage({ params }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ProductDetail productId={params.id} />
      </main>
      <Footer />
    </div>
  )
}
