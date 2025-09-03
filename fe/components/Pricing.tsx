"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out Pumpkin AI.",
      features: [
        "3 image uploads per month",
        "5 edit prompts per month",
        "Basic filters & presets",
        "Community support",
      ],
    },
    {
      name: "Standard",
      price: "$5/mo",
      description: "Great for regular creators and professionals.",
      features: [
        "Unlimited image uploads",
        "100 edit prompts per month",
        "Access to advanced filters & presets",
        "Priority support",
        "Advanced settings control",
      ],
    },
    {
      name: "Premium",
      price: "$15/mo",
      description: "For power users who want it all.",
      features: [
        "Unlimited image uploads",
        "Unlimited edit prompts",
        "All advanced filters & presets",
        "Full access to advanced settings",
        "Dedicated priority support",
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="max-w-6xl mx-auto px-6 md:px-12 mt-24 mb-20 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white">Choose Your Plan</h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Whether you`&apos;`re just getting started or need advanced tools, Pumpkin AI has a plan for you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {plans.map((plan, i) => (
          <Card
            key={i}
            className="bg-[#11141B] border border-gray-800 shadow-md rounded-lg flex flex-col justify-between hover:border-blue-600 transition-colors"
          >
            <CardHeader>
              <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
              <p className="text-3xl font-bold text-blue-500 mt-2">{plan.price}</p>
              <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-300 text-sm space-y-2 mb-6">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                {plan.name === "Free" ? "Start Free" : "Choose Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}