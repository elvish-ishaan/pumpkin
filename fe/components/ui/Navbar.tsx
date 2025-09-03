"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    // Using fixed ensures it stays at the top across layouts where sticky may fail due to overflow.
    <header className="fixed mt-5 inset-x-0 top-0 z-50 text-white">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Glassmorphism frame (gradient border + blurred panel) */}
        <div className="mx-auto max-w-7xl rounded-xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent">
          <div className="relative flex h-14 items-center justify-between rounded-[0.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(11,14,19,0.75)_0%,rgba(15,17,23,0.65)_100%)] backdrop-blur-md supports-[backdrop-filter]:bg-white/5">
            {/* Logo */}
            <Link href="/" className="px-4 text-base font-semibold tracking-tight md:px-6">
              Pumpkin
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
              <Link href="#features" className="hover:text-white">Features</Link>
              <Link href="#pricing" className="hover:text-white">Pricing</Link>
              <Link href="#testimonials" className="hover:text-white">Testimonials</Link>
              {/* <Link href="#contact" className="hover:text-white">Contact</Link> */}
            </nav>

            {/* CTA (Desktop) */}
            <div className="hidden md:block pr-4 md:pr-6">
              <Button onClick={()=> router.push("/auth")} className="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">
                Get Started
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="p-2 md:hidden pr-4"
              aria-label="Toggle Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Menu */}
      {open && (
        <div className="fixed inset-x-0 top-16 mx-4 md:hidden">
          <div className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,14,19,0.85)_0%,rgba(15,17,23,0.85)_100%)] backdrop-blur-xl shadow-lg">
            <div className="flex flex-col gap-2 p-4 text-gray-300">
              <Link href="#features" className="rounded-md px-2 py-2 hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>Features</Link>
              <Link href="#pricing" className="rounded-md px-2 py-2 hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>Pricing</Link>
              <Link href="#testimonials" className="rounded-md px-2 py-2 hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>Testimonials</Link>
              <Link href="#contact" className="rounded-md px-2 py-2 hover:bg-white/5 hover:text-white" onClick={() => setOpen(false)}>Contact</Link>
              <Button className="mt-2 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
