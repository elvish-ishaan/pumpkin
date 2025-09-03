"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { motion } from "framer-motion"
import Image from "next/image"
import googleLogo from '@/public/google.png'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0E13] via-[#0F1117] to-[#121826] text-white px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-transparent to-purple-600/20 blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-[#11141B]/80 backdrop-blur-xl border border-blue-500/20 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center p-8 border-b border-white/10">
            <CardTitle className="text-4xl font-bold bg-blue-600 bg-clip-text text-transparent">
              Welcome to Pumpkin
            </CardTitle>
            <p className="text-gray-400 text-lg mt-3">
              Forget complex tools — just prompt and edit with{" "}
              <span className="text-blue-400 font-semibold">Pumpkin AI</span>.
            </p>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center gap-6 p-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-white">Sign in to continue</h2>
              <p className="text-gray-400 max-w-md">
                Use your Google account to access AI-powered editing, presets,
                filters, and advanced controls.
              </p>
            </div>

            {/* Google Sign-In Button */}
            <Button
              size="lg"
              className="w-full max-w-sm flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all duration-200"
              onClick={() => signIn("google", { callbackUrl: "/canvas", redirect: false })}
            >
              <Image src={googleLogo} alt="google_logo" height={15} width={15}/>
              Continue with Google
            </Button>

            {/* Extra Note */}
            <p className="text-sm text-gray-500 text-center mt-6">
              By signing in, you agree to Pumpkin`&apos;`s{" "}
              <a href="/terms" className="text-blue-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
