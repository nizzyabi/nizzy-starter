import { PricingCard } from "@/components/pricing-card"
import { Testimonials } from "@/components/testimonials"
import { useCurrentUser } from "@/hooks/use-current-user"

export const Landing = () => {

    return (
        <div>
            <PricingCard />
            <Testimonials />
        </div>
    )
}