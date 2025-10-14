"use client"

import { XCircle } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface PaymentFailedModalProps {
  open: boolean
  onClose: () => void
}

export default function PaymentFailed({ open, onClose }: PaymentFailedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border border-slate-700 text-center rounded-2xl max-w-sm">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex flex-col items-center space-y-4"
        >
          <XCircle className="w-16 h-16 text-red-500" />
          <h2 className="text-2xl font-bold text-red-500">Payment Failed</h2>
          <p className="text-sm text-slate-400">
            Oops! Something went wrong with your payment. Please try again.
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
