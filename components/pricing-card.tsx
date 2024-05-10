import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

{/* Update Tiers Here*/}
const tiers = [
    {
      name: "Free",
      price: 0,
      description: "Free forever, for teams just getting started",
      features: ["50k Events per month", "10 Alerts", "Custom Dashboards", "Priority Support", "10,000 Users", "Unlimited Integrations", "Max Retention" ],
      cta: "Get Started for Free",
    },
    {
      name: "Pro",
      price: 20,
      description: "For larger teams with increased usage",
      features: ["50k Events per month", "10 Alerts", "Custom Dashboards", "Priority Support", "10,000 Users", "Unlimited Integrations", "Max Retention" ],
      cta: "Try Pro for 14 days",
    },
    {
      name: "Enterprise",
      price: 50,
      description: "For businesses with custom needs",
      features: ["50k Events per month", "10 Alerts", "Custom Dashboards", "Priority Support", "10,000 Users", "Unlimited Integrations", "Max Retention" ],
      cta: "Scale Up",
    },
];
  
export const PricingCard = () => {
    return (
        <section className="relative">
            <div className="max-w-6xl px-4 mx-auto sm:px-6">
                <div className="py-12 md:py-20">
                    {/* Title */}
                    <div className="max-w-3xl pb-12 mx-auto text-center">
                        <h2 className="pb-4 text-4xl font-extrabold text-primary">
                            Pricing Plans
                        </h2>
                    </div>
                    {/* Cards */}
                    <div className="h-full grid gap-6 md:grid-cols-12 group">
                        {tiers.map((tier, i) => (
                            <div
                                key={tier.name}
                                className="h-full md:col-span-6 lg:col-span-4 group/item"
                                data-aos="fade-down"
                            >
                                <div>
                                    <div className="relative h-full bg-secondary border border-primary/20 rounded-[5px] z-20 overflow-hidden">
                                        <div className="flex flex-col">
                                            <div className="p-8">
                                                <h3 id={tier.name} className="text-lg font-semibold leading-8 text-primary">
                                                    {tier.name}
                                                </h3>
                                                <h3 className="inline-flex items-baseline pb-1 mt-6 font-bold text-primary">
                                                    <span className="text-4xl">${tier.price}</span>
                                                </h3>
                                                <p className="mt-4 text-sm leading-6 text-primary/40">
                                                    {tier.description}
                                                </p>
                                                <ul role="list" className="mt-8 text-sm space-y-3 leading-6 text-primary">
                                                    {tier.features.map((feature) => (
                                                        <li key={feature} className="flex gap-x-3">
                                                            <Check
                                                                className="h-6 w-5 text-emerald-400 flex-none"
                                                                aria-hidden="true"
                                                            />
                                                                {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link
                                                    className="mt-16 w-full justify-center flex items-center whitespace-nowrap transition duration-150 ease-in-out font-medium rounded px-4 py-1.5  text-secondary bg-primary group"
                                                    href="/overview"
                                                >
                                                    Get Started{" "}
                                                    <ArrowRight className="w-3 h-3 tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
    }