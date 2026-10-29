import LoginForm from "../../components/login-form"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
