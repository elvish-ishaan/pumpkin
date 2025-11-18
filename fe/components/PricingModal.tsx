"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Script from "next/script"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { PaymentSuccessModal } from "./modals/PaymentSuccess";
import PaymentFailed from "./modals/PaymentFailed";



// Declare Razorpay globally
declare global {
  interface Window {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
   Razorpay: any;
  }
}


export default function PricingModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const plans = [
    {
      name: "Standard",
      price: "₹447/mo",
      planId: process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_STANDARD!,
      sub: "For creators who edit regularly.",
      features: [
        "Unlimited uploads",
        "100 prompts / month",
        "Advanced filters & presets",
        "Priority support",
      ],
      buttonLabel: "Choose Plan",
      highlight: true,
    },
    {
      name: "Premium",
      price: "₹1,323/mo",
      planId: process.env.NEXT_PUBLIC_RAZORPAY_PLAN_ID_PREMIUM!,
      sub: "Unlimited everything for power users.",
      features: [
        "Unlimited uploads",
        "Unlimited prompts",
        "All filters & presets",
        "Dedicated support",
      ],
      buttonLabel: "Choose Plan",
    },
  ]
  const {data: session, update} =  useSession()
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [isPaymentFailed, setIsPaymentFailed] = useState(false)

  const createSubscription = async (planId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
        });

      const data = await response.json();
      return data?.subscription;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  };

  const processPayment = async (planId: string) => {
    try {
      const subscription = await createSubscription(planId);
      if (!subscription?.id || !window.Razorpay) return;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: subscription.id,
        name: "Pumpkin",
        description: "Payment for pumkin subscription",
        notes: {
          plan: planId,
        },
        handler: async (response: {
          razorpay_payment_id: string,
          razorpay_subscription_id:string,
          razorpay_signature: string,
        }) => {
          const data = {
            userId: session?.user?.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySubscriptionId: response.razorpay_subscription_id,
            razorpaySignature: response.razorpay_signature,
          };
          const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/varify-subscription`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });

          const res = await result.json();
           //show user taost for sucessful payment
           if(res.isOk){
            console.log("Subscription successful");
            //update the session to get latest data
            await update()
            onOpenChange(false)
            //show payment success modal
           }
        },
        prefill: { name, email: "example@gmail.com" },
        theme: { color: "#000000" },
      };

      const paymentObject = new window.Razorpay(options);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      paymentObject.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error);
        setIsPaymentFailed(true)
      });
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <>
    <PaymentSuccessModal open={isPaymentSuccess} onClose={()=> setIsPaymentSuccess(false)}/>
    <PaymentFailed open={isPaymentFailed} onClose={() => setIsPaymentFailed(false)}/>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-[100vw] bg-slate-900 text-white border border-slate-700 rounded-2xl px-6 py-6">
        <DialogHeader className=" gap-0">
          <DialogTitle className="text-center text-lg lg:text-2xl md:text-2xl font-bold">
            Choose Your Plan
          </DialogTitle>
          <p className="text-center text-slate-400 text-sm md:mt-2 lg:mt-2">
            Flexible pricing for every creator.
          </p>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row md:flex-row gap-6 place-items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`w-full p-2 md:p-6 lg:p-6 rounded-xl bg-slate-800 border ${
                plan.highlight
                  ? "border-blue-500 shadow-lg shadow-blue-500/20"
                  : "border-slate-700"
              } flex flex-col`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="text-lg md:text-3xl lg:text-3xl font-bold text-blue-400 mt-1">
                {plan.price}
              </p>
              <p className="text-slate-400 text-sm mt-1 mb-4">{plan.sub}</p>

              <ul className="space-y-1 md:space-y-2 lg:space-y-3 text-sm text-slate-300 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-1 md:gap-2 lg:gap-3">
                    <span className="text-blue-400">•</span> {f}
                  </li>
                ))}
              </ul>

              <Button onClick={() => processPayment(plan?.planId)} className=" mt-2 md:mt-6 lg:mt-6 w-full rounded-md bg-blue-600 hover:bg-blue-700">
                {plan.buttonLabel}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  )
}
