"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Palette } from "lucide-react"
import { useSession } from "next-auth/react"

const PRESETS: Record<string, string[]> = {
  "Portrait": ["Soft Glow", "Vintage Portrait", "Cinematic Portrait", "Bright & Airy", "Moody Portrait"],
  "Landscape": ["Vivid Nature", "Dramatic Skies", "Golden Hour", "Cool Tones", "Warm Sunset"],
  "Urban": ["City Lights", "Street Photography", "Neon Nights", "Gritty Urban", "Architectural"],
  "Food": ["Fresh & Bright", "Warm & Cozy", "Dark & Moody", "Vibrant Colors", "Minimalist"],
  "Travel": ["Adventure", "Tropical", "Winter Wonderland", "Desert Vibes", "European Charm"],
  "Black & White": ["Classic B&W", "High Contrast", "Film Noir", "Sepia Tone", "Grainy"],
  "Vintage": ["70s Film", "Polaroid", "Retro Fade", "Vintage Warmth", "Old Photo"],
  "Modern": ["Clean & Minimal", "Matte Finish", "High Key", "Low Key", "Duotone"],
  "Artistic": ["Painterly", "Watercolor", "Sketch Effect", "Oil Painting", "Pop Art"],
  "Seasonal": ["Spring Fresh", "Summer Vibes", "Autumn Warmth", "Winter Cool", "Holiday Cheer"]
}

interface PresetProps {
  setCurrentGenImg: Dispatch<SetStateAction<string | null>>
  image: File | null
  setLoading: Dispatch<SetStateAction<boolean>>
  setInitPrompt: Dispatch<SetStateAction<boolean>>
  disabled?: boolean
}

export default function PresetPopover({ image, setCurrentGenImg, setLoading, setInitPrompt }: PresetProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(PRESETS)[0])
  const [selectedPreset, setSelectedPreset] = useState<string>("")
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()

  const handleApply = async () => {
    if (!image || !selectedPreset) {
      alert("No file chosen or preset selected")
      return
    }

    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("filter", selectedPreset)
      setLoading(true)
      setOpen(false)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: formData,
      })

      const data = await res.json()
      if (!data.success) {
        alert(data.message || "Error applying preset")
        return
      }

      setCurrentGenImg(data?.genRes)
      setInitPrompt(false)
      setOpen(false)
      
    } catch (error) {
      console.error('Error applying preset:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-slate-300 hover:text-white hover:bg-slate-700/50"
        >
          <Palette className="w-5 h-5" />
          {selectedPreset ? `Preset: ${selectedPreset}` : "Presets"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        className="bg-slate-900 border border-slate-700 rounded-xl shadow-lg w-[750px] h-[500px] flex flex-col p-0"
      >
        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Categories (left column) */}
          <div className="w-48 border-r border-slate-700 overflow-y-auto p-3 space-y-2">
            {Object.keys(PRESETS).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className={`w-full justify-start text-xs md:text-sm rounded-md
                  ${selectedCategory === cat
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Presets (right column) */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {PRESETS[selectedCategory].map((preset) => (
              <Button
                key={preset}
                variant={selectedPreset === preset ? "default" : "outline"}
                className={`w-full justify-center text-xs md:text-sm rounded-md
                  ${selectedPreset === preset
                    ? "bg-purple-600 hover:bg-purple-700 text-white border-purple-600"
                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/70"}`}
                onClick={() => setSelectedPreset(preset)}
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700 flex justify-end bg-slate-800/60">
          <Button
            onClick={handleApply}
            disabled={!selectedPreset}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-lg"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
