import CartPage from "../../components/cart-page"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function Cart() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
