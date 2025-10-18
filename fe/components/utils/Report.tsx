"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { toast } from "sonner"

export default function ReportFeedback() {
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback`,{
            method: 'POST',
            headers: {
          "Content-Type": "application/json",
        },
            body: JSON.stringify({
                category: category,
                details: message
            })
        })
        const data = await res.json()
        if(!data?.success){
            toast.error(data?.message)
        }
        setMessage("")
        setCategory("")
        setOpen(false)
        toast.success("Thanks For Your Feedback")
    } catch (error) {
        console.log(error,'error in posting feedback')
        toast.error('something went wrong')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-md bg-blue-600 hover:bg-blue-700 text-white gap-2 m-5 hidden md:flex">
          <MessageSquare className="w-4 h-4" />
          Hey? Tap me
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg bg-slate-900 text-white border border-slate-700 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-400">
            Share Your Feedback
          </DialogTitle>
          <p className="text-slate-400 text-sm">
            Help us improve Pumpkin AI by reporting issues, suggesting features, or sharing your thoughts.
          </p>
        </DialogHeader>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Category</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-slate-800 border border-slate-700 text-white">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 text-slate-200 border border-slate-700">
              <SelectItem value="bug">🐞 Bug Report</SelectItem>
              <SelectItem value="feature">💡 Feature Request</SelectItem>
              <SelectItem value="feedback">💭 General Feedback</SelectItem>
              <SelectItem value="other">❓ Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message Box */}
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Details</label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue, idea, or feedback..."
            className="min-h-[120px] bg-slate-800 border border-slate-700 text-white rounded-md"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!category || !message}
            className="rounded-md bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
