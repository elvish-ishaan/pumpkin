"use client"

import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Testimonials from "@/components/Testimonial"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/ui/Navbar"
import { useRouter } from "next/navigation"

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
          Edit With a Prompt — No More Complex Platforms, No More Overhead
        </h2>
        <p className="text-gray-400 max-w-2xl mt-6">
          Transform your photos effortlessly with AI. Just type your prompt and let Pumpkin
          handle the rest — faster, simpler, and smarter.
        </p>
        <div className="flex gap-4 mt-8">
          <Button onClick={()=> router.push("/auth")} className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-6">
            Try Now
          </Button>
          <Button variant="secondary" className="rounded-md bg-[#1A1D24] text-gray-200 hover:bg-[#22252E] px-6">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 md:px-12 mt-20">
        <Card className="bg-[#11141B] border-none shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Smart Enhancements</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-400">
            One-click AI upgrades that make your images pop instantly.
          </CardContent>
        </Card>
        <Card className="bg-[#11141B] border-none shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Creative Styles</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-400">
            Choose from dozens of professional-grade filters and looks.
          </CardContent>
        </Card>
        <Card className="bg-[#11141B] border-none shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-white">Seamless Workflow</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-400">
            Drag & drop, adjust settings, and export with ease.
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="flex flex-col items-center text-center px-6 md:px-12 mt-24 mb-20">
        <h3 className="text-2xl md:text-3xl font-bold">Start Creating Today</h3>
        <p className="text-gray-400 max-w-xl mt-4">
          Unlock the full potential of your images with Pumpkin’s powerful AI editing studio.
        </p>
        <Button onClick={()=> router.push("/auth")} className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-8 mt-6">
          Get Started Free
        </Button>
      </section>
      <Pricing/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}
