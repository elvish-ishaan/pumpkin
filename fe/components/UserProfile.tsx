"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function UserProfile() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <div className="p-4 text-sm text-muted-foreground">
        Not signed in
      </div>
    )
  }

  const user = session.user

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-900/60">
      {/* Profile Picture */}
      <Avatar className="w-10 h-10">
        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
        <AvatarFallback>
          {user?.name?.[0] || "?"}
        </AvatarFallback>
      </Avatar>

      {/* User Info */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-white">
          {user?.name || "Anonymous"}
        </span>
        <span className="text-xs text-muted-foreground truncate max-w-[180px]">
          {user?.email}
        </span>
      </div>
    </div>
  )
}
