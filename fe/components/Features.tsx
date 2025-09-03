"use client"

import { File, Sliders, Sparkles } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <File className="w-8 h-8 text-primary" />,
      title: "Smart Enhancements",
      description: "Instantly upgrade your images with AI-powered edits.",
    },
    {
      icon: <Sliders className="w-8 h-8 text-primary" />,
      title: "Creative Styles",
      description: "Apply modern filters and professional-grade looks.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Seamless Workflow",
      description: "Simple, fast, and designed to keep you focused.",
    },
  ]

  return (
    <section className="w-full px-6 py-20 md:py-28 bg-background">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Features That Matter
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
          No clutter, no complexity — just the tools you need to edit with a
          prompt and create stunning results.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-4">
              <div className="mb-2">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
