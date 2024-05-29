'use client'
import { Check, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

// Update Tiers Here
export const tiers = [
  {
    name: "Basic",
    price: 8,
    description: "Free forever, for teams just getting started",
    features: ["720p Video Rendering", "2GB Cloud Storage", "Basic Video Templates"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: 12,
    description: "For larger teams with increased usage",
    features: ["1080p Video Rendering", "10GB Cloud Storage", "Premium Video Templates", "Collaboration Tools"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 17,
    description: "For businesses with custom needs",
    features: ["4K Video Rendering", "Unlimited Cloud Storage", "Custom Video Templates", "Advanced Collaboration Tools", "Dedicated Support"],
    cta: "Get Started",
    popular: false,
  },
];

export const pricing = 1000

export const PricingCard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async (price: number, name: string) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/api/checkout', { price, name })
            window.location.href = response.data.url;
        } catch (error) {
            toast.error('Failed')
        } finally {
            setIsLoading(false);
        }
    }
  return (
    <div>
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="pb-4 text-4xl font-extrabold text-primary">
                Pricing
            </h2>
        </div>
        <section className="w-full flex items-center justify-center">
            <div className="container px-4 md:px-6 ">
                {/* Pricing Card Display */}
                <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
                    {tiers.map((tier) => (
                        <div key={tier.name} className={`relative flex flex-col p-6 shadow-lg rounded-lg  justify-between border bg-secondary ${tier.popular ? 'border-purple-500' : 'border-primary/20 bg-secondary'}`}>
                            {tier.popular && (
                                <div className="bg-secondary px-3 py-1 text-white text-sm bg-gradient-to-r from-pink-500 to-purple-500 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    Popular
                                </div>
                            )}
                            {/* Pricing */}
                            <div>
                                <h3 className="text-2xl font-bold text-center">{tier.name}</h3>
                                <div className="mt-4 text-center text-primary/60">
                                    <span className="text-4xl font-bold">${tier.price}</span>/ month
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {tier.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                        <Check className="text-secondary text-xs bg-green-500 rounded-full mr-2 p-1" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Button */}
                            <div className="mt-6">
                                <Button onClick={() => onClick(tier.price, tier.name)} className={`w-full flex ${tier.popular ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : ''}`}>
                                    {tier.cta}
                                    <Sparkle className="ml-1 h-5 w-5"/>
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
