"use client"

import type { ReactNode } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface DialogWrapperProps {
  trigger: ReactNode
  title: string
  description: string
  children: ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function DialogWrapper({ trigger, title, description, children, open, onOpenChange }: DialogWrapperProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}

