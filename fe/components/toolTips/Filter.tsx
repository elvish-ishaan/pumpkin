"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

const FILTERS: Record<string, string[]> = {
  "Basic Adjustments": ["Brightness", "Contrast", "Exposure", "Highlights", "Shadows", "Saturation", "Vibrance", "Warmth"],
  "Color Filters": ["Sepia", "Black & White", "Vintage", "Duotone", "Cool/Warm Tones", "Split Toning"],
  "Artistic Filters": ["Oil Painting", "Watercolor", "Sketch", "Cartoon", "Pencil Drawing", "Pop Art"],
  "Blurs & Sharpening": ["Gaussian Blur", "Motion Blur", "Radial Blur", "Sharpen", "Smart Sharpen"],
  "Distortion": ["Pixelate", "Lens Flare", "Vignette", "Tilt-Shift", "Fisheye", "Bulge/Pinch"],
  "Lighting Effects": ["HDR", "Glow", "Lens Flare", "Sunlight", "Shadows/Highlights Adjustment"],
  "Texture Overlays": ["Grain", "Noise", "Dust/Scratches", "Paper Texture", "Light Leaks"],
  "Portrait Enhancers": ["Skin Smoothing", "Blemish Removal", "Teeth Whitening", "Eye Brightening"],
  "Vintage/Retro": ["70s Film", "Polaroid", "Kodachrome", "Lomo", "Cross-Process"],
  "Modern/Trendy": ["Matte", "Cinematic", "Neon", "Cyberpunk", "Pastel", "Moody"],
  "Nature Enhancers": ["Sky Enhancer", "Foliage Boost", "Sunset/Sunrise Tints"],
  "Special Effects": ["Double Exposure", "Glitch", "Dispersion", "Light Streaks", "Bokeh"],
  "AI-Powered": [ "Auto-Enhance", "Background Removal"],
}

interface FilterProps {
    setCurrentGenImg: Dispatch<SetStateAction<string | null>>
    image: File | null
    setLoading: Dispatch<SetStateAction<boolean>>
    setInitPrompt: Dispatch<SetStateAction<boolean>>
    disabled?: boolean
}

export default function FilterPopover({image, setCurrentGenImg, setLoading, setInitPrompt}: FilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(Object.keys(FILTERS)[0])
  const [selectedFilter, setSelectedFilter] = useState<string>("")
  const [open, setOpen] = useState(false)
  const {data: session} = useSession()

  const handleApply = async () => {
    //if file not preset
    if(!image || !selectedFilter){
        toast.info("no file choosen or filter choosen")
        return
    }
    try {
        const formData = new FormData()
        formData.append("image", image)
        formData.append("filter", selectedFilter)
        setLoading(true)
        setOpen(false)
        //call the api to apply the filter
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-image`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.user?.token}`,
            },
            body: formData,
        });
        const data = await res.json();
        if(!data.success){
            toast.error(data.message || "Error applying filter")
            return
        }
        //set the current generated image
        setCurrentGenImg(data?.genRes)
        setInitPrompt(false)
        setOpen(false)

    } catch (error) {
        console.log(error,'error applying filter');
    }finally{
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
          <Sparkles className="w-5 h-5" />
          {selectedFilter ? `Filter: ${selectedFilter}` : "Filters"}
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
          <div className="w-48 border-r border-slate-700 overflow-y-auto p-3 space-y-1">
            {Object.keys(FILTERS).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "ghost"}
                className={`w-full justify-start text-xs md:text-sm rounded-md 
                  ${selectedCategory === cat 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Filters (right column) */}
          <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            {FILTERS[selectedCategory].map((f) => (
              <Button
                key={f}
                variant={selectedFilter === f ? "default" : "outline"}
                className={`w-full justify-center text-xs md:text-sm rounded-md
                  ${selectedFilter === f 
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-600" 
                    : "bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/70 hover:textwhi"}`}
                onClick={() => setSelectedFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-700 flex justify-end bg-slate-800/60">
          <Button
            onClick={handleApply}
            disabled={!selectedFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
