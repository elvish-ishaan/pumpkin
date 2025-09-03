"use client"

import CanvasStepper from "@/components/CanvasStepper"
import Loader from "@/components/loaders/Loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import UserProfile from "@/components/UserProfile"
import {
  Upload,
  History,
  Shuffle,
  Sparkles,
  Layers,
  Square,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"

export default function Page() {
  const [prompt, setPrompt] = useState("")
  const [quality, setQuality] = useState([0.7])
  const [currentImg, setCurrentImg] = useState<File | null>(null)
  const [currentGenImg, setCurrentGenImg] = useState<string | null>(null)
  const [showBefore, setShowBefore] = useState(false)
  const [isInitPrompt, setIsInitPrompt] = useState<boolean>(true)
  const [isPromptDisabled, setIsPromptDisabled] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false)
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const {data: session} = useSession()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) {
      alert("Please upload an image file.")
      return
    }
    setCurrentImg(file)
    // Close left sidebar on mobile after upload
    if (window.innerWidth < 768) {
      setIsLeftSidebarOpen(false)
    }
  }

  const handleGenerate = async () => {
    if (!prompt && !currentImg) {
      alert("Please enter a prompt or upload an image.")
      return
    }
    try {
      const formData = new FormData()
      formData.append("prompt", prompt)
      if (currentImg) {
        formData.append("image", currentImg)
      }
      setIsLoading(true)
      const res = await fetch(`${apiUrl}/generate-image`,{
        headers: {
          "Authorization": `Bearer ${session?.user?.token}`
        },
        method: "POST",
        body: formData,
      })
      const data = await res.json()
      if(!data.success){
        alert("Image generation failed!")
      }
      setCurrentGenImg(data?.genRes)
      setIsInitPrompt(false)
      setPrompt("")
      // Close right sidebar on mobile after generation
      if (window.innerWidth < 768) {
        setIsRightSidebarOpen(false)
      }
    } catch (error) {
      console.log(error, "getting err while generating")
    }finally{
      setIsLoading(false)
    }
  }

  const getDisplayImage = () => {
    if (!currentImg && !currentGenImg) {
      return null
    }
    
    if (!currentImg && currentGenImg) {
      return { src: currentGenImg, alt: "Generated" }
    }
    if (currentImg && !currentGenImg) {
      return { src: URL.createObjectURL(currentImg), alt: "Uploaded" }
    }
    
    if (showBefore && currentImg) {
      return { src: URL.createObjectURL(currentImg), alt: "Uploaded (Before)" }
    }
    if (!showBefore && currentGenImg) {
      return { src: currentGenImg, alt: "Generated (After)" }
    }
    
    return currentImg 
      ? { src: URL.createObjectURL(currentImg), alt: "Uploaded" }
      : { src: currentGenImg!, alt: "Generated" }
  }

  const displayImage = getDisplayImage()
  const canToggle = currentImg && currentGenImg

  const handleFollowUp = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${apiUrl}/follow-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.token}`
        },
        body: JSON.stringify({
          imageUrl: currentGenImg,
          prompt: prompt,
        }),
      })
      const data = await res.json()
      if (!data.success) {
        alert("Follow-up request failed!")
      }
      setCurrentGenImg(data?.genRes)
      setPrompt("")
      // Close right sidebar on mobile after follow-up
      if (window.innerWidth < 768) {
        setIsRightSidebarOpen(false)
      }
    } catch (error) {
      console.log(error, 'error while follow up............')
      alert('Follow-up request failed!')
    }finally{
      setIsLoading(false)
    }
  }

  const handleDownload = async () => {
    if (!displayImage?.src) return

    try {
      const pathname = new URL(currentGenImg as string).pathname; 
      const filename = pathname.split("/").pop();
      const res = await fetch(`http://localhost:8080/download?imageUrl=${filename}`);
      const data = await res.json()
     if(!data.success){
      alert("Download failed!")
      return
     }

      const link = document.createElement("a")
      link.href = data.downloadUrl
      link.download = "edited-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error("Download failed:", err)
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-slate-900 relative">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-800/80 border-b border-slate-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          className="text-white hover:bg-slate-700/50"
        >
          <Menu className="w-5 h-5" />
        </Button>        
      </header>

      {/* Left Sidebar */}
      <aside
  className={`
    fixed md:relative top-0 left-0 z-50 w-64 h-full bg-slate-900/95 md:bg-slate-900/60 
    transform transition-transform duration-300 ease-in-out
    ${isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    md:w-64 md:flex md:flex-col
  `}
>
  {/* Mobile close button */}
  <div className="md:hidden flex justify-end p-4">
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsLeftSidebarOpen(false)}
      className="text-white hover:bg-slate-700/50"
    >
      <X className="w-5 h-5" />
    </Button>
  </div>

  {/* Sidebar content */}
  <div className="flex flex-col justify-between h-[100vh] p-4 md:p-6">
    {/* Logo */}
    <span className="px-2 font-semibold text-lg tracking-widest text-white mb-4">
      PUMPKIN
    </span>

    {/* Upload button */}
    <div className="mb-6">
      <input
        type="file"
        onChange={handleImageUpload}
        className="hidden"
        id="file-upload"
        accept="image/*"
      />
      <label htmlFor="file-upload" className="block cursor-pointer">
        <div className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-3 flex items-center justify-center gap-2 transition-colors">
          <Upload className="w-4 h-4" />
          Upload
        </div>
      </label>
    </div>

    {/* Tools in the middle */}
    <div className="space-y-2">
      <ToolButton icon={<History className="w-5 h-5" />} label="History" />
      <ToolButton icon={<Shuffle className="w-5 h-5" />} label="Resize" />
      <ToolButton icon={<Sparkles className="w-5 h-5" />} label="Filters" />
      <ToolButton icon={<Layers className="w-5 h-5" />} label="Effects" />
      <ToolButton icon={<Square className="w-5 h-5" />} label="Overlays" />
    </div>

    {/* Logout button pinned at bottom */}
    <div className="mt-auto pt-4 border-t border-slate-700/50">
    <UserProfile/>
      <Button
        onClick={() => signOut({
          redirect: true,
          callbackUrl: "/"
        }) }
        variant="outline"
        className="w-full flex items-center justify-center gap-2 rounded-md  bg-rose-500 text-white border-slate-600 hover:bg-rose-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Logout
      </Button>
    </div>
  </div>
      </aside>



      {/* Overlay for mobile */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setIsLeftSidebarOpen(false)
            setIsRightSidebarOpen(false)
          }}
        />
      )}

      {/* Main Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 bg-slate-900 min-h-screen md:min-h-0">
        <div className="flex-1 flex items-center justify-center w-full max-w-4xl">
          <div className="w-full max-w-2xl h-64 sm:h-80 md:h-96 lg:h-[600px] rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700/50 flex items-center justify-center">
            {isLoading ? (
              <Loader/>
            ) : displayImage ? (
              <Image
                width={800}
                height={600}
                src={displayImage?.src}
                alt={displayImage?.alt}
                className="object-contain w-full h-full rounded-2xl"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            ) : (
              <CanvasStepper />
            )}
          </div>
        </div>
        
        {canToggle && (
          <div className="flex items-center gap-2 md:gap-4 mt-4 md:mt-6 bg-slate-800/80 rounded-full px-4 md:px-6 py-2 md:py-3">
            <Button
              variant={showBefore ? "default" : "ghost"}
              className={`px-3 md:px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                showBefore 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
              onClick={() => setShowBefore(true)}
            >
              Before
            </Button>
            
            <Button
              variant={!showBefore ? "default" : "ghost"}
              className={`px-3 md:px-6 py-2 rounded-full font-medium transition-all text-sm md:text-base ${
                !showBefore 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
              onClick={() => setShowBefore(false)}
            >
              After
            </Button>
          </div>
        )}

        {/* Mobile Bottom Controls */}
        <div className="md:hidden w-full mt-4">
          <div className="bg-slate-800/95 rounded-t-2xl p-4 space-y-4">
            {/* Prompt Input for Mobile */}
            <div className="space-y-3">
              <label className="text-base font-semibold text-white">Prompt</label>
              <Textarea
                placeholder="Describe what you want to create or modify..."
                value={prompt}
                disabled={isPromptDisabled}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.split(" ").length > 100) {
                    setIsPromptDisabled(true);
                  }else{
                    setPrompt(value);
                  }
                }}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg min-h-[80px] resize-none text-sm"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {isInitPrompt ? (
                <Button 
                  disabled={isLoading}
                  onClick={handleGenerate} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-sm"
                >
                  Enhance
                </Button>
              ) : (
                <Button 
                  disabled={isLoading}
                  onClick={handleFollowUp} 
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-sm"
                >
                  Follow Up
                </Button>
              )}
              
              {currentGenImg && (
                <Button 
                  onClick={handleDownload}
                  variant="outline"
                  className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 rounded-lg py-3 px-4 font-medium text-sm"
                >
                  Download
                </Button>
              )}
            </div>

            {/* Collapsible Advanced Settings for Mobile */}
            <div className="border-t border-slate-700/50 pt-4">
              <Button
                variant="ghost"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                className="w-full flex items-center justify-between text-white hover:bg-slate-700/50 p-3 rounded-lg"
              >
                <span className="font-medium">Advanced Settings</span>
                {isAdvancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
              
              {isAdvancedOpen && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300">Resolution</label>
                      <select className="w-full rounded-lg bg-slate-700/50 border-slate-600 text-white p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>1024 × 1024</option>
                        <option>512 × 512</option>
                        <option>1920 × 1080</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300">Style</label>
                      <select className="w-full rounded-lg bg-slate-700/50 border-slate-600 text-white p-2 text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Default</option>
                        <option>Realistic</option>
                        <option>Illustration</option>
                        <option>Anime</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Quality</label>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      step={0.01}
                      min={0}
                      max={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>0.00</span>
                      <span className="font-medium text-white">{quality[0].toFixed(2)}</span>
                      <span>1.00</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300">Seed</label>
                      <Input 
                        type="text" 
                        placeholder="Random" 
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg text-xs p-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-300">Variations</label>
                      <Input 
                        type="text" 
                        placeholder="e.g. 4" 
                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg text-xs p-2"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Desktop Only */}
      <aside className={`
        fixed md:relative top-0 right-0 z-50 w-80 h-[100vh] bg-slate-800/95 md:bg-slate-800/50 
        transform transition-transform duration-300 ease-in-out
        ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        hidden md:flex md:flex-col
        ${isRightSidebarOpen ? 'md:mt-0' : 'md:mt-0'}
      `}>
        < >
         <div className="p-6 space-y-6 flex-1 overflow-auto">
          {/* Prompt Input */}
          <div className="space-y-3">
            <label className="text-lg font-semibold text-white">Prompt</label>
            <Textarea
              placeholder="Describe what you want to create or modify..."
              value={prompt}
              disabled={isPromptDisabled}
              onChange={(e) => {
                const value = e.target.value;
                if (value.split(" ").length > 100) {
                  setIsPromptDisabled(true);
                }else{
                  setPrompt(value);
                }
              }}
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg min-h-[100px] resize-none"
            />
            {
              isInitPrompt ? (
                <Button 
                  onClick={handleGenerate} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-base"
                >
                  Enhance
                </Button>
              ) : (
                <Button 
                  onClick={handleFollowUp} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-3 text-base"
                >
                  Follow Up
                </Button>
              )
            }
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">
              Advanced Settings
            </h4>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Resolution</label>
              <select className="w-full rounded-lg bg-slate-700/50 border-slate-600 text-white p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>1024 × 1024</option>
                <option>512 × 512</option>
                <option>1920 × 1080</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Style</label>
              <select className="w-full rounded-lg bg-slate-700/50 border-slate-600 text-white p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Default</option>
                <option>Realistic</option>
                <option>Illustration</option>
                <option>Anime</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Quality</label>
              <Slider
                value={quality}
                onValueChange={setQuality}
                step={0.01}
                min={0}
                max={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>0.00</span>
                <span className="font-medium text-white">{quality[0].toFixed(2)}</span>
                <span>1.00</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Seed</label>
              <Input 
                type="text" 
                placeholder="Random" 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-300">Variations</label>
              <Input 
                type="text" 
                placeholder="e.g. 4" 
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons - Desktop */}
        <div className="hidden md:block p-6 border-t border-slate-700/50">
          {currentGenImg && (
            <Button 
              onClick={handleDownload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium"
            >
              Download
            </Button>
          )}
        </div>
        </>
      </aside>
    </div>
  )
}

function ToolButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <Button
      variant="ghost"
      className="justify-start gap-3 rounded-lg hover:bg-slate-700/50 text-slate-300 hover:text-white p-3 md:p-4 font-medium w-full text-sm md:text-base"
    >
      {icon} {label}
    </Button>
  )
}