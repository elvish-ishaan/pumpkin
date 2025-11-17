import React from "react";

const plans = [
  {
    name: "Free",
    price: "₹0",
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
    price: "₹447/mo",
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
    price: "₹1,323/mo",
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

export default function Pricing() {
  return (
    <section className="w-full py-16 text-gray-800">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-sky-700">Plans & Pricing</h2>
        <p className="text-lg text-gray-600 mb-12">
          Choose the perfect plan for your creative journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className=" bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-2xl shadow-lg p-8 border border-sky-200 hover:shadow-xl transition duration-300"
            >
              <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-sky-700 mb-4">{plan.price}</p>
              <p className=" text-gray-300 mb-6">{plan.description}</p>

              <ul className="space-y-3 text-left">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-1"></span>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full py-3 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition">
                {plan.name === "Free" ? "Start for Free" : "Get Started"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
