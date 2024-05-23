import { PricingCard } from "@/components/pricing-card"
import { Testimonials } from "@/components/testimonials"
import { Header } from "@/components/header"

export const Landing = () => {
    return (
        <div className="space-y-40">
            <Header />
            <PricingCard />
            <Testimonials />
        </div>
    )
}