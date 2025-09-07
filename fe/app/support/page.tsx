"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-blue-400">
          Support
        </h1>
        <p className="mt-3 text-slate-400 text-lg">
          We’re here to help! Find answers to common questions or reach out directly to our team.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-xl font-semibold text-blue-300">Frequently Asked Questions</h2>
        <Accordion
          type="single"
          collapsible
          className="w-full space-y-2 text-slate-200"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-slate-100 hover:text-blue-400">
              How do I upgrade my plan?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              You can upgrade your plan anytime from the Pricing page. After payment, your account
              will instantly reflect the new limits.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-slate-100 hover:text-blue-400">
              What happens if I hit my free limits?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              You won’t be able to upload new images or use prompts until your cycle resets or you
              upgrade to a paid plan.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-slate-100 hover:text-blue-400">
              Can I cancel my subscription?
            </AccordionTrigger>
            <AccordionContent className="text-slate-400">
              Yes, you can cancel anytime. You’ll retain premium features until the end of your
              billing cycle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Support Card */}
      <div className="max-w-2xl mx-auto mt-12">
        <Card className="bg-slate-800/70 border border-slate-700 rounded-2xl shadow-lg">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">Still need help?</h3>
            <p className="text-sm text-slate-400">
              If you couldn’t find your answer in the FAQs, reach out to our support team.
            </p>
            <span className=" text-lg text-blue-400">support@dryink.space</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
