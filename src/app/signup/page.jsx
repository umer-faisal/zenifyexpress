import SignupForm from "../../components/signup-form"
import Header from "../../components/header"
import Footer from "../../components/footer"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <SignupForm />
      </main>
      <Footer />
    </div>
  )
}
