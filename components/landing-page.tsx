import { PricingCard } from "@/components/pricing-card"
import { Testimonials } from "@/components/testimonials"
import { Header } from "@/components/header"
import { Language } from "./languages"

export const Landing = () => {
    return (
        <div className="space-y-40">
            <Header />
            <Language />
            <PricingCard />
            <Testimonials />
        </div>
    )
}