"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import UsageTracker from "./UsageBox"

function parseLimit(value?: string): number | "UNLIMITED" {
  if (!value) return 0
  if (value.toUpperCase() === "UNLIMITED") return "UNLIMITED"
  return Number(value)
}


export default function UserProfile() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Not signed in
      </div>
    )
  }

  console.log(parseLimit(process.env.NEXT_PUBLIC_STANDARD_ALLOWED_IMAGE_PROMPTS!),'getting parced env.................')
  return (
    <>
    <UsageTracker
  plan={session.user?.planType || "free"}
  imagesUsed={session.user?.imagesUploaded || 0}
  editsUsed={session.user?.noOfPrompts || 0}
/>


        <div className="flex items-center gap-3 p-3 bg-slate-900/60">
      {/* Profile Picture */}
      <Avatar className="w-10 h-10">
        <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
        <AvatarFallback>
          {session.user?.name?.[0] || "?"}
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">
          {session.user?.name || "Anonymous"}
        </span>
        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
          {session.user?.email}
        </span>
      </div>
    </div>
    </>
  )
}
