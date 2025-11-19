"use client"

import HoverCard from "@/components/cards/hoverCard"
import { CompareDemo } from "@/components/CompareDemo"
import Footer from "@/components/Footer"
import Gallery from "@/components/Gallery"
import { AuroraText } from "@/components/magicui/aurora-text"
import { SparklesText } from "@/components/magicui/sparkles-text"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonial"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/ui/Navbar"
import { useRouter } from "next/navigation"

const features = [
  {
    id: 1,
    title: "Smart Enhancements",
    description: "One-click AI upgrades that make your images pop instantly."
  },
  {
    id: 2,
    title: "Creative Styles",
    description: "Choose from dozens of professional-grade filters and looks."
  },
  {
    id: 3,
    title: "Seamless Workflow",
    description: "Drag & drop, adjust settings, and export with ease."
  }
]

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0B0E13] to-[#0F1117] text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4">
        <Navbar/>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 md:px-12 mt-20">
        <h2 className="text-3xl md:text-5xl font-bold max-w-3xl leading-snug">
          Edit With a <SparklesText className=" inline-block w-fit">
            <AuroraText className=" text-5xl md:text-7xl lg:text-7xl">Prompt</AuroraText>
            </SparklesText> <span className=" hidden md:inline-block lg:inline-block">—</span> No More Complex Platforms, No More Overhead
        </h2>
        <p className="text-gray-400 max-w-2xl mt-6">
          Transform your photos effortlessly with AI. Just type your prompt and let Pumpkin
          handle the rest — faster, simpler, and smarter.
        </p>
        <div className="flex gap-4 mt-8">
          <Button className="rounded-md h-[2.6rem] text-gray-200 bg-blue-600 hover:bg-blue-700 px-6" onClick={()=> router.push("/auth")}>Get Startd</Button>
          <Button variant="secondary" className="rounded-md bg-[#1A1D24] h-[2.6rem] text-gray-200 hover:bg-[#22252E] px-6">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 md:px-12 mt-20">
        {
          features.map( f => <HoverCard key={f.id} title={f.title} description={f.description}/>)
        }
      </section>

      <CompareDemo/>
      {/* Call to Action
      <section className="flex flex-col items-center text-center px-6 md:px-12 mt-8 md:mt-44 lg:mt-44 mb-20">
        <h3 className="text-2xl md:text-3xl font-bold">Start Creating Today</h3>
        <p className="text-gray-400 max-w-xl mt-4">
          Unlock the full potential of your images with Pumpkin’s powerful AI editing studio.
        </p>
        <Button onClick={()=> router.push("/auth")} className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 mt-6">
          Get Started Free
        </Button>
      </section> */}
      <Pricing/>
      <Gallery/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}
