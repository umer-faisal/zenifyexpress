import { Button } from "../components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-card to-background py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">Discover Amazing Products</h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            Shop the latest trends and find everything you need in one place. Quality products, great prices, and fast
            delivery.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" className="px-8">
              Shop Now
            </Button>
            <Button variant="outline" size="lg">
              View Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
