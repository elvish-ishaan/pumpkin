"use client"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import PricingModal from "./PricingModal"

type PlanType = "free" | "standard" | "premium"

type UsageTrackerProps = {
  plan: string // accept any string to be safe
  imagesUsed: number
  editsUsed: number
}

const LIMITS: Record<PlanType, { images: number; edits: number }> = {
  free: {
    images: Number(process.env.NEXT_PUBLIC_FREE_ALLOWED_IMAGE_UPLOADS) || 0,
    edits: Number(process.env.NEXT_PUBLIC_FREE_ALLOWED_IMAGE_PROMPTS) || 0,
  },
  standard: {
    images:
      process.env.NEXT_PUBLIC_STANDARD_ALLOWED_IMAGE_UPLOADS === "UNLIMITED"
        ? 9999999
        : Number(process.env.NEXT_PUBLIC_STANDARD_ALLOWED_IMAGE_UPLOADS) || 0,
    edits:
      process.env.NEXT_PUBLIC_STANDARD_ALLOWED_IMAGE_PROMPTS === "UNLIMITED"
        ? 9999999
        : Number(process.env.NEXT_PUBLIC_STANDARD_ALLOWED_IMAGE_PROMPTS) || 0,
  },
  premium: {
    images:
      process.env.NEXT_PUBLIC_PREMIUM_ALLOWED_IMAGE_UPLOADS === "UNLIMITED"
        ? 9999999
        : Number(process.env.NEXT_PUBLIC_PREMIUM_ALLOWED_IMAGE_UPLOADS) || 0,
    edits:
      process.env.NEXT_PUBLIC_PREMIUM_ALLOWED_IMAGE_PROMPTS === "UNLIMITED"
        ? 9999999
        : Number(process.env.NEXT_PUBLIC_PREMIUM_ALLOWED_IMAGE_PROMPTS) || 0,
  },
}

export default function UsageTracker({
  plan,
  imagesUsed,
  editsUsed,
}: UsageTrackerProps) {
  // normalize plan
  const normalizedPlan = (plan?.toLowerCase() || "free") as PlanType

  // fallback to free if plan is invalid
  const { images: imagesLimit, edits: editsLimit } =
    LIMITS[normalizedPlan] || LIMITS["free"]

  const isFree = normalizedPlan === "free"

  const imageProgress =
    imagesLimit >= 9999999
      ? 100
      : Math.min((imagesUsed / imagesLimit) * 100, 100)

  const editsProgress =
    editsLimit >= 9999999
      ? 100
      : Math.min((editsUsed / editsLimit) * 100, 100)

  const nearLimit =
    (typeof imagesLimit === "number" && imagesLimit < 9999999 && imagesUsed >= imagesLimit - 1) ||
    (typeof editsLimit === "number" && editsLimit < 9999999 && editsUsed >= editsLimit - 1)

    const [pricingModalOpen, setPricingModalOpen] = useState<boolean>(false)

  return (
    <div className="w-full p-4 mb-2 bg-slate-800/70 border border-slate-700 rounded-xl space-y-4 text-sm text-slate-200">
      <PricingModal open={pricingModalOpen} onOpenChange={setPricingModalOpen}/>
      {/* Plan Header */}
      <div className="flex justify-between items-center">
        <span className="font-semibold capitalize"> {normalizedPlan}</span>
        {isFree && (
          <span className="text-xs text-slate-400">Free Tier</span>
        )}
      </div>

      {/* Images Usage */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">Images</span>
          <span className="text-xs">
            {imagesUsed} / {imagesLimit >= 9999999 ? "UNLIMITED" : imagesLimit}
          </span>
        </div>
        <Progress value={imageProgress} className="h-2" />
      </div>

      {/* Edits Usage */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">Edits</span>
          <span className="text-xs">
            {editsUsed} / {editsLimit >= 9999999 ? "UNLIMITED" : editsLimit}
          </span>
        </div>
        <Progress value={editsProgress} className="h-2" />
      </div>

      {/* Upgrade CTA */}
      {isFree && nearLimit && (
        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-400 mb-2">
            You’re reaching the free plan limits. Upgrade to unlock more uploads and edits.
          </p>
          <Button
            onClick={ () => setPricingModalOpen(true)}
            size="sm"
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700"
          >
            Upgrade Plan
          </Button>
        </div>
      )}
    </div>
  )
}
