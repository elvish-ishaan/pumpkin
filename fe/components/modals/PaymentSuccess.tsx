"use client"

import { CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { motion } from "framer-motion"

interface PaymentSuccessModalProps {
  open: boolean
  onClose: () => void
}

export function PaymentSuccessModal({ open, onClose }: PaymentSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-background text-foreground rounded-2xl shadow-xl border border-border flex flex-col items-center py-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6 text-2xl font-bold text-center"
        >
          Payment Successful 🎉
        </motion.h2>

        <p className="text-muted-foreground mt-2 text-center text-sm">
          Thank you for upgrading. Enjoy your new features!
        </p>
      </DialogContent>
    </Dialog>
  )
}
