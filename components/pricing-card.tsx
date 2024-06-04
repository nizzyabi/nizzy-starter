'use client'
import { Check, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// Update Tiers Here
export const tiers = [
  {
    name: "Your Product Name",
    priceBefore: 19.99,
    price: 8.99,
    features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5", "Feature 6", "Feature 7", "Feature 8", "Feature 9", "Feature 10"],
    cta: "Get Started",
    popular: true,
  },
];

export const PricingCard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/checkout')
            window.location.href = response.data.url;
        } catch (error) {
            toast.error('Error')
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div id="pricing">
      {/* Title */}
      <div className="max-w-3xl mx-auto flex flex-col items-center pb-8">
        <h2 className="pb-4 text-4xl font-extrabold text-primary">Pricing</h2>
        <p className="text-md opacity-50 max-w-lg text-center">Describe your product / service here that will impress the user & want them to buy the product</p>
      </div>
      <section className="w-full flex items-center justify-center">
        <div className="container px-4 md:px-6">
          {/* Pricing Card Display */}
          <div className="flex items-center justify-center">
            {tiers.map((tier) => (
              <div key={tier.name} className={`relative flex flex-col p-6 shadow-lg rounded-lg justify-between border bg-secondary w-full lg:w-[550px] mx-auto ${tier.popular ? 'border-violet-500' : 'border-primary/20 bg-secondary'}`}>
                {tier.popular && (
                  <div className="bg-secondary px-3 py-1 text-white text-sm bg-violet-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                    Popular
                  </div>
                )}
                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-semibold text-primary/70">{tier.name}</h3>
                  <div className="mt-4 text-primary/60">
                    <span className="font-semibold mr-2 line-through text-lg">${tier.priceBefore}</span>
                    <span className="text-4xl font-bold">${tier.price}</span>/ month
                  </div>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-primary/90">
                        <Check className="h-7 w-7 text-primary/70 rounded-full mr-2 p-1" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Button */}
                <div className="mt-6">
                  <Button onClick={onClick} className={`w-full flex ${tier.popular ? 'text-primary/70 bg-violet-500 text-white' : ''}`}>
                    {tier.cta}
                    <Sparkle className="ml-1 h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};