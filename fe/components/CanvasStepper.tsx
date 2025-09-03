"use client"

import { Upload, Type, Sparkles, ArrowRight } from "lucide-react"

export default function CanvasStepper() {
  const steps = [
    {
      icon: <Upload className="w-5 h-5 text-primary" />,
      title: "Upload Image",
      description: "Choose an image you want to edit or enhance.",
    },
    {
      icon: <Type className="w-5 h-5 text-primary" />,
      title: "Add a Prompt",
      description: "Describe your edits in plain English. Be creative!",
    },
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      title: "AI Magic ✨",
      description: "Sit back and relax while AI transforms your image.",
    },
  ]

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 p-6">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center gap-6">
          {/* Step */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              {step.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{step.title}</span>
              <span className="text-xs text-muted-foreground">
                {step.description}
              </span>
            </div>
          </div>

          {/* Arrow (skip for last) */}
          {i < steps.length - 1 && (
            <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  )
}
